import { network } from "hardhat";
const fs = require("fs"); // Importing the file system module
const { ethers } = require("ethers"); // Importing ethers for utility functions
const hre = require("hardhat"); // Importing Hardhat Runtime Environment

const FRONT_END_ADDRESSES_FILE = "../f_smart_rent_payment/src/constants/contractAddress.json";
const FRONT_END_ABI_FILE = "../f_smart_rent_payment/src/constants/abi.json";
console.log("Script started");

module.exports = async function () {
  // Check if the environment variable UPDATE_FRONTEND is set
  if (process.env.UPDATE_FRONTEND !== "true") {
    console.log("Environment variable UPDATE_FRONTEND is not set. Skipping front-end update.");
    return;
  }

  console.log("Updating front-end");

  // Ensure Hardhat environment is initialized
  await hre.run('compile');

  // Update the contract addresses and ABI
  await updateContractAddresses();
  await updateAbi();

  console.log("Contract end written!");
};
// Function to update the contract ABI
async function updateAbi() {
 console.log("Updating contract ABI..."); // Added console output
 // Retrieve the deployment information for the "OneToMany" contract
 const deployment = await hre.deployments.get("one_to_many_Optimized");
 // Write the ABI to the specified file in JSON format
 fs.writeFileSync(FRONT_END_ABI_FILE, JSON.stringify(deployment.interface.format(ethers.utils.FormatTypes.json)));
 console.log("Contract ABI updated successfully."); // Added console output
}

// Function to update the contract addresses
async function updateContractAddresses() {
 console.log("Updating contract addresses..."); // Added console output
 // Retrieve the deployment information for the "OneToMany" contract
 const deployment = await hre.deployments.get("one_to_many_Optimized");
  
 // Retrieve the chain ID from the network configuration
 const chainId = network.config?.chainId?.toString();
 if (!chainId) {
    console.error("Chain ID is not defined in the network configuration.");
    return;
 }
  
 // Read the current contract addresses from the file
 const contractAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"));
  
 // Check if the chain ID is already in the contract addresses
 if (chainId in contractAddresses) {
    // If the contract address is not already included, add it
    if (!contractAddresses[chainId].includes(deployment.address)) {
      contractAddresses[chainId] = deployment.address;
    }
 } else {
    // If the chain ID is not present, add it with the contract address
    contractAddresses[chainId] = [deployment.address];
 }
  
 // Write the updated contract addresses back to the file
 fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(contractAddresses));
 console.log("Contract addresses updated successfully."); // Added console output
}

module.exports.tags = ["all", "frontend"];
