import { ethers } from "hardhat";

export interface networkConfigItem {
  name?:string
  subscriptionId?:string
  gasLane?:string
  callbackGasLimit?:string
}

export interface networkConfigInfo {
  [key:number] : networkConfigItem
}

export const networkConig : networkConfigInfo = {
  31337 : {
    name : "localhost",
    subscriptionId : "588",
    gasLane:"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
    callbackGasLimit:"1500000"
  },
  11155111 : {
    name : "sepolia",
    subscriptionId : "588",
    gasLane:"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
    callbackGasLimit:"1500000"
  }
}

export const developmentChains = ["hardhat","localhost"]