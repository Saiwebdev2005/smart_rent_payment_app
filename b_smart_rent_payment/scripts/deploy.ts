//we only need to deploy the main contract the subcontract are added when we compile it
//npx hardhat run --network localhost scripts/deploy.ts
import hre from "hardhat"
async function main() {
  const Payment = await hre.ethers.getContractFactory("one_to_many_Optimized");
  const payment = await Payment.deploy();
  console.log(`The Payment is deployed in ${payment.target}`)
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
