const { ethers } = require('ethers');


/* Notes
npx hardhat node for local blockchain
should change the key , address and abi when change in contract 
npm start for running this scripts
*/


async function setContractDetails() {
  // Replace 'yourPrivateKey' with the private key of your Ethereum account
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

  // Connect to the local Ethereum node
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
  // Load your contract ABI and address
  const contractAddress = '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707';
  const contractAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "Payemt_InsufficientFunds",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Payment_DueDateNotPassed",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Payment_OnlyOwnerCanEntered",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "Payment_OnlySenderAccessible",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "CollateralDeposited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "CollateralTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "collateralAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "penaltyAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "paymentAmount",
          "type": "uint256"
        }
      ],
      "name": "ContractInitialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaymentMade",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "penaltyAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newPaymentAmount",
          "type": "uint256"
        }
      ],
      "name": "PenaltyAdded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "RemainingTimeForNextPayment",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "addPenalty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentSender",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "depositCollateral",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "senderKey",
          "type": "string"
        }
      ],
      "name": "getCurrentSenderCollateral",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "makePayment",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paymentAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "newSender",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "newSenderKey",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "newCollateralAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newPenaltyAmountDecimals",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newPaymentAmount",
          "type": "uint256"
        }
      ],
      "name": "setContractDetails",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "senderKey",
          "type": "string"
        }
      ],
      "name": "setSenderAddressByKey",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAmtSentByCurrentSender",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSentBySender",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "senderKey",
          "type": "string"
        }
      ],
      "name": "transferCollateral",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

  // Replace the parameters with the actual values you want to set
  const newSender = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  const newSenderKey = '1';
  const newCollateralAmount = 100; // Replace with the actual collateral amount
  const newPenaltyAmountDecimals = 1; // Replace with the actual penalty amount
  const newPaymentAmount = 10; // Replace with the actual payment amount

  // Call the setContractDetails function
  const tx = await contract.setContractDetails(
    newSender,
    newSenderKey,
    newCollateralAmount,
    newPenaltyAmountDecimals,
    newPaymentAmount
  );

  // Wait for the transaction to be mined
  await tx.wait();
  console.log('Transaction hash:', tx.hash);
}

setContractDetails().catch(console.error);
