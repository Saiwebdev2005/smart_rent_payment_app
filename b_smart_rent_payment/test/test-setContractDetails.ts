import { ethers } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe('Contract Testing', () => {
  let Payment: any, payment: any, owner: any;
  let newSender = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Use the owner's address as an example
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

  it("Owner is as expected", async () => {
    // Using eventually from chai-as-promised to handle async assertions
    const ownerAddressPromise = Promise.resolve(await payment.getOwner());

    // Log owner address to the console
    console.log("Owner Address:", await ownerAddressPromise);

    // Expect the owner to eventually equal the actual owner address
    await expect(ownerAddressPromise).to.eventually.equal(owner.address);
  });
  
  it("Sending data to setContractDetails", async () => {
    // Parameters for setContractDetails
    

    // Connect the owner Signer and call setContractDetails
    await expect(
        payment.connect(owner).setContractDetails(newSender, newSenderKey, newCollateralAmount, newPenaltyAmountDecimals, newPaymentAmount)
    ).to.not.be.reverted;

    console.log("Data sent to setContractDetails:", {
      newSender,
      newSenderKey,
      newCollateralAmount,
      newPenaltyAmountDecimals,
      newPaymentAmount
  });
    
  await payment.setSenderAddressByKey(newSenderKey)
  const getCurrentSender = await payment.currentSender()
  console.log("Current Sender Address", newSender)
  console.log("Current Sender Addrees by key",getCurrentSender)
 await expect(newSender).to.equal(getCurrentSender)
    
   

    // You can add additional assertions or verifications here
  });
});
