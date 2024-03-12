// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// rs 6800 for contract intialization
// rs 286 for every new sender entry
// rs 136 for setting sender with key
// rs 223 for every deposit - fr 3 eth
// rs 257 for every payment - fr 1 eth

//todo :
/* 
2)when payment is successful owner should return a key or something
3)when owner not sending the key then check the verfication and end the contract
4)optimization as much as possible
5)proper commenting
6)local deployment ...
*/

import "./EndContractVerification.sol";

//Error Messages
error Payment_OnlyOwnerCanEntered();
error Payment_DueDateNotPassed();
error Payment_OnlySenderAccessible();
error Payemt_InsufficientFunds();

contract OneToMany {

    //State Variables
    address payable owner;
    address payable sender;
    uint256 collateralAmount;
    uint256 penaltyAmount;
    uint256 public paymentAmount;
    uint256 originalPaymentAmount;
    uint256 dueDate;
    uint256 constant c_gracePeriod = 5 minutes;
    uint256 totalAmountSentBySender;
    bool penaltyAdded = false;

    //can try using array for storing senders
    mapping(string => address payable) addressOfSender;
    mapping(address => uint) balances;
    mapping(string => uint) collateral;

    // Instance of the EndContractVerification contract
    EndContractVerification endContractVerification;
    
    //1286800 before
    //1254800
    //1231400
    //1161200 sender change
    //1106800 after removing all require using revert
    constructor() {
        owner = payable(msg.sender);
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

    // Owner Accessable Functions

    function setContractDetails(
        address payable newSender,
        string memory newSenderKey, // new
        uint256 newCollateralAmount,
        uint256 newPenaltyAmountDecimals,
        uint256 newPaymentAmount
    ) external {
       if(msg.sender != owner){
        revert Payment_OnlyOwnerCanEntered();
       }
        // new
        addressOfSender[newSenderKey] = newSender;

        // Set the collateral amount
        //this should be replaced for mapping
        collateralAmount = newCollateralAmount * 1e18;
        //new
        collateral[newSenderKey] = newCollateralAmount * 1e18;
        // Set the penalty amount
        penaltyAmount = newPenaltyAmountDecimals * 1e10; // Convert the new penalty amount from ethers (in decimals) to wei

        // Set the payment amount
        paymentAmount = newPaymentAmount * 1e18;
        originalPaymentAmount = paymentAmount;
        emit ContractInitialized(
            sender,
            collateralAmount,
            penaltyAmount,
            paymentAmount
        );
    }

    function transferCollateral(string memory senderKey) external {
       if(msg.sender != owner){
        revert Payment_OnlyOwnerCanEntered();
       }

        // Check the payment status
        bool paymentStatus = endContractVerification.checkPaymentStatus(
            collateral[senderKey],
            totalAmountSentBySender,
            penaltyAdded
        );

        if (paymentStatus) {
            // If the payment status is true, transfer the collateral to the sender
            if(address(this).balance >= collateralAmount){
            sender.transfer(collateral[senderKey]);
            emit CollateralTransferred(sender, collateral[senderKey]);
            }
            else{
                revert("Insufficient contract balance to transfer the collateral.");
            }
        } else {
            // If the payment status is false, revert the transaction with a message
            revert("Payment issue on the sender side.");
        }
    }

    function addPenalty() external {
       if(msg.sender != owner){
        revert Payment_OnlyOwnerCanEntered();
       }
       if(block.timestamp < dueDate){
        revert Payment_DueDateNotPassed();
       }

        paymentAmount += penaltyAmount;
        penaltyAdded = true;

        emit PenaltyAdded(penaltyAmount, paymentAmount);
    }

    //Sender Accessable Functions

        function setSenderAddressByKey(string memory senderKey) external {
            sender = addressOfSender[senderKey];
        }

    // collateral depositing
    function depositCollateral() external payable {
        if(msg.sender != sender){
            revert Payment_OnlySenderAccessible();
        }
        if(msg.value < collateralAmount){
            revert Payemt_InsufficientFunds();
        }
        dueDate = block.timestamp + 1 minutes;
        emit CollateralDeposited(msg.sender, msg.value);
    }

    //making payment
    function makePayment() external payable {
       if(msg.sender != sender){
            revert Payment_OnlySenderAccessible();
        }
        if(msg.value < paymentAmount){
            revert Payemt_InsufficientFunds();
        }
        totalAmountSentBySender += msg.value;
        balances[sender] += msg.value;
        dueDate = block.timestamp + 1 minutes;

        if (penaltyAdded && msg.value >= paymentAmount) {
            resetPaymentAmount();
        }
        emit PaymentMade(msg.sender, msg.value);
    }

    function resetPaymentAmount() internal {
        paymentAmount = originalPaymentAmount;
        penaltyAdded = false;
    }

    //checking remaining time for next payment
    function RemainingTimeForNextPayment()
        external
        view
        returns (string memory, uint256)
    {
        if (block.timestamp >= dueDate) {
            return ("Penalty Added", 0);
        } else {
            return ("Payment Due Time Left", dueDate - block.timestamp);
        }
    }

    //common functions
    function currentSender() public view returns (address) {
        return sender;
    }

    function totalSentBySender() public view returns (uint) {
        return totalAmountSentBySender;
    }

    function totalAmtSentByCurrentSender() public view returns (uint) {
        return balances[sender];
    }

    function getCurrentSenderCollateral(
        string memory senderKey
    ) public view returns (uint) {
        return collateral[senderKey];
    }
     function getOwner() public view returns (address) {
        return owner;
    }
     function getPenaltyAmount() external view returns (uint256) {
        return penaltyAmount;
    }

    // Getter function for paymentAmount
    function getPaymentAmount() external view returns (uint256) {
        return paymentAmount;
    }

    function getCollateralAmount() external view returns (uint256) {
        return collateralAmount;
    }
}
