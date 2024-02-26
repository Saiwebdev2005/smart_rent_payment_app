import { ethers } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe('Contract Testing', () => {
  let Payment: any, payment: any, owner: any;
  let newSender = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Example owner's address
  let newSenderKey = '1'; // Replace with the actual key
  let newCollateralAmount = 10; // Replace with the actual amount
  let newPenaltyAmountDecimals = 5; // Replace with the actual amount
  let newPaymentAmount = 2; // Replace with the actual amount

  beforeEach('Deploying Contract', async () => {
    // Get the contract factory
    Payment = await ethers.getContractFactory("one_to_many_Optimized");

    [owner] = await ethers.getSigners();
    // Deploy the contract
    payment = await Payment.deploy();
  });

  it("Verifies owner's address", async () => {
    // Using eventually from chai-as-promised to handle async assertions
    const ownerAddressPromise = Promise.resolve(await payment.getOwner());

    // Log owner address to the console
    console.log("Owner Address:", await ownerAddressPromise);

    // Expect the owner to eventually equal the actual owner address
    await expect(ownerAddressPromise).to.eventually.equal(owner.address);
  });
  
  it("Sends data to setContractDetails", async () => {
    // Connect the owner Signer and call setContractDetails
    await expect(
      payment.connect(owner).setContractDetails(newSender, newSenderKey, newCollateralAmount, newPenaltyAmountDecimals, newPaymentAmount)
    ).to.not.be.reverted;

    // Log data sent to setContractDetails
    console.log("Data sent to setContractDetails:", {
      newSender,
      newSenderKey,
      newCollateralAmount,
      newPenaltyAmountDecimals,
      newPaymentAmount
    });

    // Retrieve contract details for verification
    await payment.setSenderAddressByKey(newSenderKey);
    const getCurrentSender = await payment.currentSender();
    const getPaymentAmount = await payment.getPaymentAmount();
    const getPenaltyAmount = await payment.getPenaltyAmount();
    const getCollateralAmount = await payment.getCurrentSenderCollateral(newSenderKey);

    // Log retrieved contract details
    console.log("Current Sender Address", newSender);
    console.log("Current Sender Address by key", getCurrentSender);
    console.log("Payment Amount", getPaymentAmount.toString());
    console.log("Penalty Amount", getPenaltyAmount.toString());
    console.log("Collateral Amount", getCollateralAmount.toString());

    // Use chai assertions to verify the values
    expect(newSender).to.equal(getCurrentSender);
    expect(newPaymentAmount * 1e18).to.equal(parseInt(getPaymentAmount.toString(), 10));
    expect(newPenaltyAmountDecimals * 1e10).to.equal(parseInt(getPenaltyAmount.toString(), 10));
    expect(newCollateralAmount * 1e18).to.equal(parseInt(getCollateralAmount.toString(), 10));
  });
});
