import React, { useState } from "react";
import { utils } from 'ethers';

// acc2 add 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
type ContractDetailsFormProps = {
  callContractFunction: (
     functionName: string,
     params: any[],
     msgValue: number
  ) => Promise<void>;
 };
 
 const ContractDetailsForm: React.FC<ContractDetailsFormProps> = ({
  callContractFunction,
 }) => {
  const [newSender, setNewSender] = useState<string>("");
  const [newSenderKey, setNewSenderKey] = useState<string>("");
  const [newCollateralAmount, setNewCollateralAmount] = useState<string>("");
  const [newPenaltyAmountDecimals, setNewPenaltyAmountDecimals] =
     useState<string>("");
  const [newPaymentAmount, setNewPaymentAmount] = useState<string>("");
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();
 
     // Validate the newSender address
     if (!utils.isAddress(newSender)) {
       console.error('Invalid Ethereum address');
       return; // Exit early if the address is invalid
     }
 
     // Convert numeric inputs to wei
     const collateralAmountWei = utils.parseEther(newCollateralAmount);
     const paymentAmountWei = utils.parseEther(newPaymentAmount);
     // Assuming newPenaltyAmountDecimals is a percentage or fraction, handle accordingly
 
     // Log the data being sent to the contract
     console.log({
       newSender,
       newSenderKey,
       newCollateralAmount: collateralAmountWei.toString(),
       newPenaltyAmountDecimals, // Ensure this is handled correctly in the contract
       newPaymentAmount: paymentAmountWei.toString(),
     });
 
     try {
       // Call the setContractDetails function with the form values
       await callContractFunction(
         "setContractDetails",
         [
           newSender,
           newSenderKey,
           collateralAmountWei,
           newPenaltyAmountDecimals, // Ensure this is handled correctly in the contract
           paymentAmountWei,
         ],
         0
       );
       console.log('Contract details set successfully');
     } catch (error) {
       console.error('Failed to set contract details:', error);
     }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="newSender" className="block text-sm font-medium">
          New Sender Address:
        </label>
        <input
          id="newSender"
          type="text"
          value={newSender}
          onChange={(e) => setNewSender(e.target.value)}
          className="mt-1 block w-full rounded-md border-green-500 focus:border-green-500 focus:ring-green-500 text-base bg-c1 text-c4"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newSenderKey" className="block text-sm font-medium">
          New Sender Key:
        </label>
        <input
          id="newSenderKey"
          type="text"
          value={newSenderKey}
          onChange={(e) => setNewSenderKey(e.target.value)}
          className="mt-1 block w-full rounded-md border-green-500 focus:border-green-500 focus:ring-green-500 text-base bg-c1 text-c4"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="newCollateralAmount"
          className="block text-sm font-medium"
        >
          New Collateral Amount:
        </label>
        <input
          id="newCollateralAmount"
          type="number"
          value={newCollateralAmount}
          onChange={(e) => setNewCollateralAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-green-500 focus:border-green-500 focus:ring-green-500 text-base bg-c1 text-c4"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="newPenaltyAmountDecimals"
          className="block text-sm font-medium"
        >
          New Penalty Amount (Decimals):
        </label>
        <input
          id="newPenaltyAmountDecimals"
          type="number"
          value={newPenaltyAmountDecimals}
          onChange={(e) => setNewPenaltyAmountDecimals(e.target.value)}
          className="mt-1 block w-full rounded-md border-green-500 focus:border-green-500 focus:ring-green-500 text-base bg-c1 text-c4"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newPaymentAmount" className="block text-sm font-medium">
          New Payment Amount:
        </label>
        <input
          id="newPaymentAmount"
          type="number"
          value={newPaymentAmount}
          onChange={(e) => setNewPaymentAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-green-500 focus:border-green-500 focus:ring-green-500 text-base bg-c1 text-c4"
        />
      </div>
      <button
        type="submit"
        className="font-bold py-2 px-4 rounded bg-c1 text-c4"
      >
        Submit
      </button>
    </form>
  );
};

export default ContractDetailsForm;
