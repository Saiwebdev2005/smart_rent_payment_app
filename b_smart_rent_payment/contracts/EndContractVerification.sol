// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EndContractVerification {
    address payable public owner;

    // Constructor to set the owner when the contract is deployed
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev Checks the payment status based on provided parameters.
     * @param _collateralAmount The collateral amount required for the contract.
     * @param _totalAmountSentBySender The total amount sent by the sender.
     * @param _penaltyAdded Flag indicating whether a penalty has been added.
     * @return True if payment status is valid, false otherwise.
     */
    function checkPaymentStatus(
        uint _collateralAmount,
        uint _totalAmountSentBySender,
        bool _penaltyAdded
    ) public view returns (bool) {
        // Ensure only the owner can call this function for verification
        require(
            msg.sender == owner,
            "Unauthorized. Only the owner can call this function."
        );

        // Check if the collateral amount is less than the total amount paid by the sender
        bool collateralCheck = _totalAmountSentBySender > _collateralAmount;

        // Check if no penalty is added
        bool penaltyCheck = !_penaltyAdded;

        // Return true if both collateral and penalty checks pass, indicating valid payment status
        return collateralCheck && penaltyCheck;
    }
}
