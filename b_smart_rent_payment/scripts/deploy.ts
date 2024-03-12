// Import necessary types and functions from ethers and hardhat
import { Addressable, isAddress } from "ethers";
import hre from "hardhat";

async function main() {
 // Get the contract factory for the "OneToMany" contract
 const PaymentFactory = await hre.ethers.getContractFactory("OneToMany");
 const Payment = await hre.ethers.getContractFactory("OneToMany");

 // Deploy the "OneToMany" contract
 const payment = await Payment.deploy();

 // Determine the contract address, handling both string and Addressable types
 const contractAddress: string = typeof payment.target === 'string' ? payment.target : payment.target.toString();

 // Log the deployed contract's address
 console.log(`The Payment is deployed at ${contractAddress}`);

 // Save the deployment details, including the ABI and contract address
 await hre.deployments.save("OneToMany", {
    abi: PaymentFactory.interface.format(),
    address: contractAddress,
 });

 // Log all deployed contracts
 console.log("Listing all deployed contracts...");
 const allDeployments = await hre.deployments.all();
 console.log(allDeployments);
}

// Execute the deployment script
main()
 .then(() => process.exit(0)) // Exit with success status code if deployment is successful
 .catch((error) => {
    console.error(error); // Log any errors that occur during deployment
    process.exit(1); // Exit with error status code if deployment fails
 });
