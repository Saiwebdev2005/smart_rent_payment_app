// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// rs 6800 for contract initialization
// rs 286 for every new sender entry
// rs 136 for setting sender with key
// rs 223 for every deposit - fr 3 eth
// rs 257 for every payment - fr 1 eth

//todo :
/* 
2)when payment is successful owner should return a key or something
3)when owner not sending the key then check the verification and end the contract
4)optimization as much as possible
5)proper commenting
6)local deployment ...
*/

/* 
steps to access contract
1)O - setContractDetails - (senderAddress,SenderKey,CollateralAmount,Penalty,Payment)
2)S - setSenderAddressByKey - (SenderKey)
3)S - DepositCollateral - CollateralAmount
4)S - MakePayment - Payment
*/

import "./EndContractVerification.sol";

// Error Messages
error OnlyOwnerCanAccess(string action);
error DueDateNotPassed(string action);
error OnlySenderAccessible(string action);
error InsufficientFunds(string action);

contract OneToManyOptimized {

    // Constants
    uint256 constant public COLLATERAL_MULTIPLIER = 1e18;
    uint256 constant public PENALTY_MULTIPLIER = 1e10;
    uint256 constant public MINUTES_IN_GRACE_PERIOD = 5 minutes;

    // State Variables
    address payable public contractOwner;
    address payable public currentSender;
    uint256 public collateralAmount;
    uint256 public penaltyAmount;
    uint256 public paymentAmount;
    uint256 public originalPaymentAmount;
    uint256 public dueDate;
    uint256 public totalAmountSentBySender;
    bool private penaltyAdded = false;

    // Mapping for sender information
    mapping(string => address payable) public addressOfSender;
    mapping(address => uint) public senderBalances;
    mapping(string => uint) public senderCollateral;

    // Instance of the EndContractVerification contract
    EndContractVerification public endContractVerification;

    modifier onlyOwner() {
        if (msg.sender != contractOwner) {
            revert OnlyOwnerCanAccess("function");
        }
        _;
    }


    modifier onlySender() {
        if (msg.sender != currentSender) {
            revert OnlySenderAccessible("function");
        }
        _;
    }

    constructor() {
        contractOwner = payable(msg.sender);
        endContractVerification = new EndContractVerification();
    }

    // Events
    event PenaltyAdded(uint256 penaltyAmount, uint256 newPaymentAmount);
    event CollateralDeposited(address indexed sender, uint256 amount);
    event PaymentMade(address indexed sender, uint256 amount);
    event CollateralTransferred(address indexed sender, uint256 amount);
    // Event that will be emitted when a new contract is initialized
    event ContractInitialized(
        address indexed sender,
        uint256 collateralAmount,
        uint256 penaltyAmount,
        uint256 paymentAmount
    );

    // Owner Accessible Functions

    /**
     * @dev Initializes the contract with sender details, collateral amount, penalty, and payment amount.
     * @param newSender The address of the sender.
     * @param newSenderKey The unique key for the sender.
     * @param newCollateralAmount The collateral amount in Ether.
     * @param newPenaltyAmountDecimals The penalty amount in Ether.
     * @param newPaymentAmount The initial payment amount in Ether.
     */
    function setContractDetails(
        address payable newSender,
        string memory newSenderKey,
        uint256 newCollateralAmount,
        uint256 newPenaltyAmountDecimals,
        uint256 newPaymentAmount
    ) external onlyOwner {
        addressOfSender[newSenderKey] = newSender;
        collateralAmount = newCollateralAmount * COLLATERAL_MULTIPLIER;
        senderCollateral[newSenderKey] = newCollateralAmount * COLLATERAL_MULTIPLIER;
        penaltyAmount = newPenaltyAmountDecimals * PENALTY_MULTIPLIER;
        paymentAmount = newPaymentAmount * COLLATERAL_MULTIPLIER;
        originalPaymentAmount = paymentAmount;
        emit ContractInitialized(
            newSender,
            collateralAmount,
            penaltyAmount,
            paymentAmount
        );
    }

    /**
     * @dev Transfers collateral to the sender after successful verification.
     * @param senderKey The unique key for the sender.
     */
    function transferCollateral(string memory senderKey) external onlyOwner {
        bool paymentStatus = endContractVerification.checkPaymentStatus(
            senderCollateral[senderKey],
            totalAmountSentBySender,
            penaltyAdded
        );

         if (!paymentStatus) {
            revert("Payment issue on the sender side");
        }

        if (address(this).balance < collateralAmount) {
            revert("Insufficient contract balance to transfer the collateral");
        }

        currentSender.transfer(senderCollateral[senderKey]);
        emit CollateralTransferred(currentSender, senderCollateral[senderKey]);
        delete addressOfSender[senderKey];
        delete senderCollateral[senderKey];
    }

    /**
     * @dev Adds penalty to the payment amount after due date.
     */
    function addPenalty() external onlyOwner {
          if (block.timestamp < dueDate) {
            revert DueDateNotPassed("adding penalty");
        }

        paymentAmount += penaltyAmount;
        penaltyAdded = true;

        emit PenaltyAdded(penaltyAmount, paymentAmount);
    }

    // Sender Accessible Functions

    /**
     * @dev Sets the current sender address using the sender key.
     * @param senderKey The unique key for the sender.
     */
    function setSenderAddressByKey(string memory senderKey) external {
        currentSender = addressOfSender[senderKey];
    }

    /**
     * @dev Allows the sender to deposit collateral.
     */
    function depositCollateral() external payable onlySender {
        if (msg.value < collateralAmount) {
        revert InsufficientFunds("depositing collateral");
    }

        dueDate = block.timestamp + MINUTES_IN_GRACE_PERIOD;
        emit CollateralDeposited(currentSender, msg.value);
    }

    /**
     * @dev Allows the sender to make a payment.
     */
    function makePayment() external payable onlySender {
        if (msg.value < paymentAmount) {
        revert InsufficientFunds("making payment");
    }

        totalAmountSentBySender += msg.value;
        senderBalances[currentSender] += msg.value;
        dueDate = block.timestamp + MINUTES_IN_GRACE_PERIOD;

        if (penaltyAdded && msg.value >= paymentAmount) {
            resetPaymentAmount();
        }

        emit PaymentMade(currentSender, msg.value);
    }

    /**
     * @dev Resets the payment amount and penalty status.
     */
    function resetPaymentAmount() internal {
        paymentAmount = originalPaymentAmount;
        penaltyAdded = false;
    }

    // Common Functions

    /**
     * @dev Returns the remaining time for the next payment.
     * @return A tuple containing a message and the remaining time.
     */
    function remainingTimeForNextPayment() external view returns (string memory, uint256) {
        if (block.timestamp >= dueDate) {
            return ("Penalty Added", 0);
        } else {
            return ("Payment Due Time Left", dueDate - block.timestamp);
        }
    }

    /**
     * @dev Returns the current sender address.
     * @return The current sender address.
     */
    function getCurrentSender() public view onlySender returns (address) {
        return currentSender;
    }

    /**
     * @dev Returns the total amount sent by the sender.
     * @return The total amount sent by the sender.
     */
    function totalSentBySender() public view returns (uint) {
        return totalAmountSentBySender;
    }

    /**
     * @dev Returns the total amount sent by the current sender.
     * @return The total amount sent by the current sender.
     */
    function totalAmtSentByCurrentSender() public view onlySender returns (uint) {
        return senderBalances[currentSender];
    }

    /**
     * @dev Returns the collateral of the current sender.
     * @param senderKey The unique key for the sender.
     * @return The collateral of the current sender.
     */
    function getCurrentSenderCollateral(string memory senderKey) public view returns (uint) {
        return senderCollateral[senderKey];
    }
}
