import React from 'react'
import Web3 from 'web3'
function Contract() {

  async function createContractInstance(web3,abi,contractAddress){
    const contract = new web3.eth.Contract(abi,contractAddress);
    return contract;
  }
  
  return (
    <div className='h-screen w-full p-12'>
      <div className='flex flex-col justify-center items-center space-y-6 max-w-5xl mx-auto'>
       <h1 className='text-4xl'>Lets Start the Contract</h1>
      </div>
    </div>
  )
}

export default Contract