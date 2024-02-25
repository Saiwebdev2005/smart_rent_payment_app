import { ethers } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe('Contract Testing', () => {
  let Payment: any, payment: any, owner: string;

  beforeEach('Deploying Contract', async () => {
    // Get the contract factory
    Payment = await ethers.getContractFactory("one_to_many_Optimized");

    // Get the owner's address
    owner = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

    // Deploy the contract
    payment = await Payment.deploy();
  });
  
  it("Successfully Deployed", async () => {
    // Check if the contract is successfully deployed
    expect(!payment.address).to.equal(true);
  });

  it("Owner is as expected", async () => {
    // Using eventually from chai-as-promised to handle async assertions
    await expect(payment.getOwner()).to.eventually.equal(owner);
  });

  it("Adding new Sender to the Contract", async () => {
    let sender = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    let senderKey = "1";
    let CollateralAmount = 1;
    let penaltyAmount = 1;
    let paymentAmount = 1;

    // Set contract details using the owner's account
    await payment.connect(owner).setContractDetails(sender, senderKey, CollateralAmount, penaltyAmount, paymentAmount);
    await payment.connect(owner).setSenderAddressByKey(senderKey);

    // Check the result using the owner's account
    const currentSender = await payment.connect(owner).currentSender();
    const currentSenderCollateral = await payment.getCurrentSenderCollateral(senderKey);
    const currentPaymentAmount = await payment.getPaymentAmount();
    const currentPenaltyAmount = await payment.getPenaltyAmount();

    // Checking the New Sender's Contract Details
    it("Checking the New Sender's Contract Details", async () => {
      expect(currentSender).to.equal('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
      expect(currentSenderCollateral).to.equal(CollateralAmount);
    });

    // Check the values of paymentAmount and penaltyAmount
    expect(currentPaymentAmount).to.equal(paymentAmount);
    expect(currentPenaltyAmount).to.equal(penaltyAmount);
  });
});
