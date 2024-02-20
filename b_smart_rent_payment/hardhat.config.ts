import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-chai-matchers";

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/8cAuHYtk5pZaV5S4z9QKIKLbAj3JEc3i"
const PRIVATE_KEY = process.env.PRIVATE_KEY || '976ec26d8620bbdeff41ac071ad26407ee1bd7e03cf7b10d27067e91ccfc2ff9'
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY


const config: HardhatUserConfig = {
   defaultNetwork : "hardhat",
   networks:{
    hardhat:{
      chainId:31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      //   accounts: {
      //     mnemonic: MNEMONIC,
      //   },
      saveDeployments: true,
      chainId: 11155111,
  },
   } ,
  solidity: "0.8.19",
};

export default config;
