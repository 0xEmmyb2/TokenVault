import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance()).toString());

  const network = await hre.ethers.provider.getNetwork();
  console.log("Network:", network.name);

  //Token Contract Deployment
  console.log("\nDeploying AGRITOKEN contract...");
  const AGRITOKEN = await hre.ethers.getContractFactory("AGRITOKEN");
  const agriToken = await AGRITOKEN.deploy();

  await agriToken.waitForDeployment();

  console.log("\nDeployment Successfull!");
  console.log("-------------------------");
  console.log("\nNEXT_PUBLIC_AGRITOKEN_ADDRESS:", agriToken.getAddress);
  console.log("\nNEXT_PUBLIC_OWNER_ADDRESS:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
