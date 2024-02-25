import { ethers } from "hardhat";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe('Contract Testing', () => {
  let Payment, payment:any, owner;

  beforeEach('Deploying Contract', async () => {
    Payment = await ethers.getContractFactory("one_to_many_Optimized");
    owner = await ethers.getSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    payment = await Payment.deploy();
  });
  
  it("Successfully Deployed", async () => {
    expect(!payment.address).to.equal(true);
  });

  it("Owner is as expected", async () => {
    // Using eventually from chai-as-promised to handle async assertions
    await expect(payment.getOwner()).to.eventually.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  });
});
