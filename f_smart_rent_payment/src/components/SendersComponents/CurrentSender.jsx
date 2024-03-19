import React, { useState } from 'react';

function CurrentSender() {
 const [currentSenderAddress, setCurrentSenderAddress] = useState('');

 const callContractFunction = async (functionName, params = [], msgValue = 0) => {
    // Your existing callContractFunction implementation...
    // Make sure to update currentSenderAddress with the result of the call
    const result = await contract.methods[functionName](...params).call();
    setCurrentSenderAddress(result);
 };

 return (
    <div>
      <button
        onClick={() => callContractFunction('currentSender', [], 0)}
      >
        Get Current Sender
      </button>
      {currentSenderAddress && (
        <p>Current Sender Address: {currentSenderAddress}</p>
      )}
    </div>
 );
}

export default CurrentSender;
