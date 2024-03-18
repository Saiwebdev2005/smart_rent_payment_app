"use client"
import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import {abi,contractAddressVar} from "../../constants"
function Contract() {
 
 // State to hold the Web3 instance and the contract instance
 const [web3, setWeb3] = useState(null);
 const [contract, setContract] = useState(null);
 const [chainId, setChainId] = useState(null);

 const contractAddress = contractAddressVar['31337'];
 useEffect(() => {
    // This effect runs once when the component mounts
    // It initializes the Web3 instance and the contract instance

    // Check if Web3 has been injected by the browser (e.g., MetaMask)
    if (window.ethereum) {
      // Create a new Web3 instance using the injected provider
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Request account access if needed
      // This prompts the user to connect their wallet if they haven't already
      window.ethereum.enable().then(() => {
        // Create a new contract instance using the ABI and contract address
        const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
        setContract(contractInstance);
      });
    } else {
      // Log a message if the user does not have a web3 provider installed
      console.log('Please install MetaMask!');
    }
 }, []); // Empty dependency array means this effect runs once on mount

 // Function to call a contract function
 // This can be used to interact with the smart contract
 const callContractFunction = async (functionName, params = [], msgValue = 0) => {
  // Check if the Web3 and contract instances have been initialized
  if (!web3 || !contract) {
     console.log('Web3 or contract is not initialized');
     return;
  }
 
  try {
     // Determine if the function is read-only or state-modifying
     const isReadOnly = msgValue === 0; // Assuming msgValue is 0 for read-only calls
 
     // Attempt to call the specified contract function
     // The functionName parameter specifies which function to call
     // The params array contains any arguments to pass to the function
     // The msgValue parameter specifies the amount of Ether to send with the transaction (if any)
     let result;
     if (isReadOnly) {
       // For read-only calls, use .call()
       result = await contract.methods[functionName](...params).call();
     } else {
       // For state-modifying calls, use .send()
       result = await contract.methods[functionName](...params).send({
         from: window.ethereum.selectedAddress, // The address from which to send the transaction
         value: web3.utils.toWei(msgValue.toString(), 'ether') // Convert the msgValue from Ether to Wei
       });
     }
     console.log(result);
  } catch (error) {
     // Log any errors that occur during the transaction
     console.error('Error calling contract function:', error);
  }
 };
 
 // Function to get and set the chain ID
 const getChainId = async () => {
  if (web3) {
     try {
       const chainIdBigInt = await web3.eth.getChainId();
       // Convert the BigInt to a regular number
       const chainId = Number(chainIdBigInt);
       console.log('Chain ID retrieved:', chainId);
       setChainId(chainId); // Update the chain ID state with the number
     } catch (error) {
       console.error('Error getting chain ID:', error);
     }
  } else {
     console.log('Web3 is not initialized');
  }
 };

// Call getChainId when web3 is initialized
useEffect(() => {
  if (web3) {
    getChainId();
  }
}, [web3]);

  return (
    <div className='h-screen w-full p-12'>
      <div className='flex flex-col justify-center items-center space-y-6 max-w-5xl mx-auto'>
       <h1 className='text-4xl'>Lets Start the Contract</h1>
       <p>Chain ID : {chainId}</p>
       <p>Contract Address is {contractAddress}</p>
       <button className='bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300' onClick={() => callContractFunction('getOwner', [], 0)}>Get Contract Owner</button>
      </div>
    </div>
  )
}

export default Contract