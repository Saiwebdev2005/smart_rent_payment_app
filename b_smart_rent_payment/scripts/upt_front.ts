import { ethers } from "ethers";
import { artifacts, deployments, getNamedAccounts } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import { Artifact, HardhatRuntimeEnvironment } from "hardhat/types";

const hre: HardhatRuntimeEnvironment = require("hardhat");
const fs = require("fs");

// Define paths for ABI and contract address files
const FRONT_END_ABI_FILE = "../f_smart_rent_payment/src/constants/abi.json";
const FRONT_END_ADDRESSES_FILE = "../f_smart_rent_payment/src/constants/contractAddress.json";

const main = async () => {
    console.log("Test Function Working");

    // Retrieve deployment information for 'OneToMany' contract
    const deployment = await deployments.get("OneToMany");

    // Extract contract address and ABI from deployment information
    const contractAddress = deployment.address;
    // const contractABI = deployment.abi;

//The below is getting abi from artifacts
    const OneToManyArtifact: Artifact = await artifacts.readArtifact("OneToMany");
    const contractABI = OneToManyArtifact.abi;

    console.log("The Address of OneToMany contract is:", contractAddress);
    console.log("The ABI of OneToMany contract is:", contractABI);

    // Update ABI and contract address files
    updateAbi(contractABI);
    updateContractAddresses(contractAddress);
}

// Update ABI file with the provided ABI
async function updateAbi(OneTOManyABI: any[]) {
    const abiJson = JSON.stringify(OneTOManyABI, null, 2);
    fs.writeFileSync(FRONT_END_ABI_FILE, abiJson);
    console.log("Contract ABI updated successfully.");
}

// Update contract address file with the provided address
async function updateContractAddresses(OneToManyAddress: Address) {
    console.log("Sending Address");

    try {
        // Obtain the chain ID of the current network
        const chainId = hre.network.config.chainId;

        // Check if chainId is defined
        if (chainId === undefined) {
            console.error("Chain ID is undefined. Cannot update contract addresses.");
            return; // Exit the function if chainId is undefined
        }

        // Prepare the JSON structure with the chain ID and contract address
        const addressJson = JSON.stringify({ [chainId]: OneToManyAddress }, null, 2);

        // Append to the existing file or overwrite it based on your needs
        // This example overwrites the file
        fs.writeFileSync(FRONT_END_ADDRESSES_FILE, addressJson);

        console.log(`Address successfully sent for chain ID ${chainId} -> `, OneToManyAddress);
    } catch (error) {
        console.error("Error updating contract addresses:", error);
    }
}




main().catch(console.error);
