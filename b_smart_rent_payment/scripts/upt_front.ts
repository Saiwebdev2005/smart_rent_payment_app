import { ethers } from "ethers";
import { artifacts, deployments, getNamedAccounts } from "hardhat";
import { Artifact, HardhatRuntimeEnvironment } from "hardhat/types";

const hre: HardhatRuntimeEnvironment = require("hardhat");
const fs = require("fs");

const FRONT_END_ABI_FILE = "../f_smart_rent_payment/src/constants/abi.json";
const FRONT_END_ADDRESSES_FILE = "../f_smart_rent_payment/src/constants/contractAddress.json";
const main = async () => {
    console.log("Test Function Working");

    // Retrieve the deployment information for the 'OneToMany' contract
    const deployment = await deployments.get("OneToMany");

    // Extract the contract address from the deployment information
    const contractAddress = deployment.address;

    console.log("The Address of OneToMany contract is:", contractAddress);

    // Assuming you want to update the ABI as well
    const OneToManyArtifact: Artifact = await artifacts.readArtifact("OneToMany");
    const OneTOManyABI = OneToManyArtifact.abi;
    
    updateAbi(OneTOManyABI);
}

async function updateAbi(OneTOManyABI: any[]) {
    // Convert the ABI to a JSON string
    const abiJson = JSON.stringify(OneTOManyABI, null, 2);

    // Write the ABI to the specified file in JSON format
    fs.writeFileSync(FRONT_END_ABI_FILE, abiJson);
    console.log("Contract ABI updated successfully.");
}

main().catch(console.error);
