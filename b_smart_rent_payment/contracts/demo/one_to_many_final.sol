// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// rs 6800 for contract intialization
// rs 286 for every new sender entry
// rs 136 for setting sender with key
// rs 223 for every deposit - fr 3 eth
// rs 257 for every payment - fr 1 eth


//todo :
/* 
1)seperate collateral for each sender or store as whole and when ending return the required
2)when payment is successful owner should return a key or something
3)when owner not sending the key then check the verfication and end the contract
4)optimization as much as possible
5)proper commenting
6)local deployment ...
*/

import "./EndContractVerification.sol";

contract one_to_many {
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

   //new
    mapping(string => address payable) addressOfSender;

    // Instance of the EndContractVerification contract
    EndContractVerification endContractVerification;

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
        require(
            msg.sender == owner,
            "Unauthorized. Only the owner can change these details."
        );

        // new
        addressOfSender[newSenderKey] = newSender; 

        // Set the collateral amount
        collateralAmount = newCollateralAmount * 1e18;

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

        function transferCollateral() external {
        require(
            msg.sender == owner,
            "Unauthorized. Only the owner can call this function."
        );

        // Check the payment status
        bool paymentStatus = endContractVerification.checkPaymentStatus(
            collateralAmount,
            totalAmountSentBySender,
            penaltyAdded
        );

        if (paymentStatus) {
            // If the payment status is true, transfer the collateral to the sender
            require(
                address(this).balance >= collateralAmount,
                "Insufficient contract balance to transfer the collateral."
            );
            sender.transfer(collateralAmount);
            emit CollateralTransferred(sender, collateralAmount);
        } else {
            // If the payment status is false, revert the transaction with a message
            revert("Payment issue on the sender side.");
        }
    }

    function addPenalty() external {
        require(
            msg.sender == owner,
            "Unauthorized. Only the owner can call this function."
        );
        require(block.timestamp >= dueDate, "The due date has not passed yet.");

        paymentAmount += penaltyAmount;
        penaltyAdded = true;

        emit PenaltyAdded(penaltyAmount, paymentAmount);
    }
    
    //Sender Accessable Functions

    function setSenderAddressByKey(string memory senderKey) external{
      sender = addressOfSender[senderKey];
    }

    // collateral depositing
    function depositCollateral() external payable  {
        require(msg.sender == sender, "Only sender can deposit");
        require(
            msg.value >= collateralAmount,
            "Insufficient funds for collateral"
        );
        dueDate = block.timestamp + 1 minutes;
        emit CollateralDeposited(msg.sender, msg.value);
    }

    //making payment
    function makePayment() external payable  {
        require(msg.sender == sender, "Only sender can make payment");
        require(msg.value >= paymentAmount, "Insufficient funds for payment");
        totalAmountSentBySender += msg.value;
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
   function currentSender() public view returns (address){
    require(msg.sender == sender, "Only sender can acessc this");
    return  sender;
   }

   function totalSentBySender() public view returns(uint){
    require(msg.sender == sender, "Only sender can acessc this");
    return  totalAmountSentBySender;
   }

}
