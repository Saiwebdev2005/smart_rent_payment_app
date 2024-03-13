"use client"
import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import {abi,contractAddress} from "../../constants"
function Contract() {
 
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
 
  useEffect(() => {
     // Check if Web3 has been injected by the browser (Mist/MetaMask)
     if (window.ethereum) {
       const web3Instance = new Web3(window.ethereum);
       setWeb3(web3Instance);
 
       // Request account access if needed
       window.ethereum.enable().then(() => {
         const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
         setContract(contractInstance);
       });
     } else {
       console.log('Please install MetaMask!');
     }
  }, []);
 
  const callContractFunction = async (functionName, params = [], msgValue = 0) => {
     if (!web3 || !contract) {
       console.log('Web3 or contract is not initialized');
       return;
     }
 
     try {
       // If the function is a call (read-only), use call
       // If it's a transaction (write), use send
       const result = await contract.methods[functionName](...params).send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei(msgValue.toString(), 'ether') });
       console.log(result);
     } catch (error) {
       console.error('Error calling contract function:', error);
     }
  };
  return (
    <div className='h-screen w-full p-12'>
      <div className='flex flex-col justify-center items-center space-y-6 max-w-5xl mx-auto'>
       <h1 className='text-4xl'>Lets Start the Contract</h1>
      </div>
    </div>
  )
}

export default Contract