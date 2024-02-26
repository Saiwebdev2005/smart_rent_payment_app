import { ethers } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe('Contract Testing', () => {
  let Payment: any, payment: any, owner: any;

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
  
});
