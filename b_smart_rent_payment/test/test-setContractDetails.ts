import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { Signer } from "ethers";
import { ethers } from "hardhat";

use(chaiAsPromised);

describe('Contract Testing', () => {
  let Payment: any, payment: any, owner: Signer, sender: Signer;
  let senderKey = '1'; // Replace with the actual key
  let newCollateralAmount = 10; // Replace with the actual amount
  let newPenaltyAmountDecimals = 5; // Replace with the actual amount
  let newPaymentAmount = 2; // Replace with the actual amount

  beforeEach('Deploying Contract', async () => {
    // Get the contract factory
    Payment = await ethers.getContractFactory("one_to_many_Optimized");

    [owner, sender] = await ethers.getSigners();
    // Deploy the contract
    payment = await Payment.deploy();
  });

  it("Verifies owner's address", async () => {
    // Using eventually from chai-as-promised to handle async assertions
    const ownerAddressPromise = Promise.resolve(await payment.getOwner());

    // Log owner address to the console
    console.log("Owner Address:", await ownerAddressPromise);

    // Expect the owner to eventually equal the actual owner address
    await expect(ownerAddressPromise).to.eventually.equal(await owner.getAddress());
  });

  it("Sends data to setContractDetails", async () => {
    // Connect the owner Signer and call setContractDetails
    await expect(
      payment.connect(owner).setContractDetails(await sender.getAddress(), senderKey, newCollateralAmount, newPenaltyAmountDecimals, newPaymentAmount)
    ).to.not.be.reverted;

    // Log data sent to setContractDetails
    console.log("Data sent to setContractDetails:", {
      sender,
      senderKey,
      newCollateralAmount,
      newPenaltyAmountDecimals,
      newPaymentAmount
    });

    // Retrieve contract details for verification
    await payment.setSenderAddressByKey(senderKey);
    const getCurrentSender = await payment.currentSender();
    const getPaymentAmount = await payment.getPaymentAmount();
    const getPenaltyAmount = await payment.getPenaltyAmount();
    const getCollateralAmount = await payment.getCurrentSenderCollateral(senderKey);

    // Log retrieved contract details
    console.log("Current Sender Address", await sender.getAddress());
    console.log("Current Sender Address by key", getCurrentSender);
    console.log("Payment Amount", getPaymentAmount.toString());
    console.log("Penalty Amount", getPenaltyAmount.toString());
    console.log("Collateral Amount", getCollateralAmount.toString());

    // Use chai assertions to verify the values
    expect(await sender.getAddress()).to.equal(getCurrentSender);
    expect(newPaymentAmount * 1e18).to.equal(parseInt(getPaymentAmount.toString(), 10));
    expect(newPenaltyAmountDecimals * 1e10).to.equal(parseInt(getPenaltyAmount.toString(), 10));
    expect(newCollateralAmount * 1e18).to.equal(parseInt(getCollateralAmount.toString(), 10));

    // Sender deposits collateral
    await expect(payment.connect(sender).depositCollateral({ value: ethers.parseEther(newCollateralAmount.toString()) }))
      .to.emit(payment, "CollateralDeposited")
      .withArgs(await sender.getAddress(), ethers.parseEther(newCollateralAmount.toString()));

    const depositedCollateral = await payment.getCollateralAmount();
    console.log("Deposited Collateral Amount is", depositedCollateral.toString());

    try {
      // Attempt to make a payment (expecting it to be reverted)
      await payment.connect(sender).makePayment({ value: ethers.parseEther(newPaymentAmount.toString()) });
    } catch (error) {
      console.log("Actual error message:", error);
    }

    const paymentMade = await payment.totalAmtSentByCurrentSender();
    console.log("Payment sent by sender", paymentMade.toString());

    //runs and deposit payment until the collateral is crossed
   //runs and deposit payment until the collateral is crossed
for (let i = 0; i < newCollateralAmount; i++) {
  await expect(payment.connect(sender).makePayment({ value: ethers.parseEther(newPaymentAmount.toString()) }));

  const paymentMade = await payment.totalAmtSentByCurrentSender();
  console.log(`Payment ${i + 1} sent by sender:`, paymentMade.toString());

  if (BigInt(paymentMade.toString()) >= BigInt(getCollateralAmount)) {
    break;
  }
}

  });
});
