import { useState } from "react";

function SetSenderByKey({ callContractFunction }) {
 // Example state for the form
 const [senderKey, setSenderKey] = useState('');
 // State to store the current sender address
 const [currentSenderAddress, setCurrentSenderAddress] = useState('');

 const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Sender key sent is : ${ senderKey} `);
    // Example call to a contract function
    callContractFunction('setSenderAddressByKey', [senderKey], 0);
 };

 // Function to handle the button click
 const handleButtonClick = async () => {
  console.log("Calling currentSender function...");
  try {
     const address = await callContractFunction('currentSender', [], 0);
     console.log("Address received:", address);
     setCurrentSenderAddress(address);
  } catch (error) {
     console.error("Error calling currentSender:", error);
  }
 };
 

 return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senderKey">
            Sender Key:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="senderKey"
            type="text"
            value={senderKey}
            onChange={(e) => setSenderKey(e.target.value)}
          />
        </div>
        <button
          className="bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
      {/* Button to call the currentSender function from the smart contract */}
      <button
        className="bg-c1 text-c4 font-semibold px-6 py-3 rounded-full hover:bg-opacity-80 transition duration-300"
        onClick={handleButtonClick}
      >
        Get Current Sender
      </button>
      {/* Display the current sender address */}
      {currentSenderAddress && <p className="text-gray-700 text-sm">Current Sender Address: {currentSenderAddress}</p>}
    </div>
 );
}

export default SetSenderByKey;
