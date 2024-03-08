import { ethers } from "ethers";

const hre = require("hardhat");
const fs = require("fs");

const FRONT_END_ABI_FILE = "../f_smart_rent_payment/src/constants/abi.json";

const main = async () => {
    console.log("Test Function Working");
    console.log("checking the Update Frontend");
    await updateAbi();
    console.log("ABI updated");
}

const updateAbi = async () => {
    console.log("Updating contract Abi");
    console.log("Listing all deployed contracts...");
    const allDeployments = await hre.deployments.all();
    console.log(allDeployments);
    const deployment = await hre.deployments.get("one_to_many_Optimized");

    // Retrieve the contract's ABI
    const abi = deployment.interface.format(ethers.utils.FormatTypes.json);

    // Save the ABI to the frontend ABI file
    fs.writeFileSync(FRONT_END_ABI_FILE, JSON.stringify(JSON.parse(abi), null, 2));
    console.log("Contract ABI updated successfully.");
}

main();
