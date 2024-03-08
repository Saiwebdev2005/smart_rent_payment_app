//we only need to deploy the main contract the subcontract are added when we compile it
//npx hardhat run --network localhost scripts/deploy.ts
import hre from "hardhat"
async function main() {
  const Payment = await hre.ethers.getContractFactory("OneToMany");
  const payment = await Payment.deploy();
  console.log(`The Payment is deployed in ${payment.target}`)
  console.log("Listing all deployed contracts...");
    const allDeployments = await hre.deployments.all();
    console.log(allDeployments);
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
