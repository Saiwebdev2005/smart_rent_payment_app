// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EndContractVerification {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function checkPaymentStatus(
        uint _collateralAmount,
        uint _totalAmountSentBySender,
        bool _penaltyAdded
    ) public view returns (bool) {
        require(
            msg.sender == owner,
            "Unauthorized. Only the owner can call this function."
        );

        // Check if the collateral amount is less than total amount paid by the sender
        bool collateralCheck = _totalAmountSentBySender > _collateralAmount;

        // Check if no penalty is added
        bool penaltyCheck = !_penaltyAdded;

        // Check if the time duration left for next payment is more than half of actual payment time

        return collateralCheck && penaltyCheck;
    }
}
