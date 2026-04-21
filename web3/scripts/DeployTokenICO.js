import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with account:", deployer.address);
  console.log(
    "Balance:",
    (await hre.ethers.provider.getBalance(deployer.address)).toString(),
  );


  console.log("\nDeploying TokenICO contract...");
  const TokenICO = await hre.ethers.getContractFactory("TokenICO");
  const tokenICO = await TokenICO.deploy();

  await tokenICO.waitForDeployment();

  console.log("TokenICO deployed to:", await tokenICO.getAddress());
  console.log("Owner:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
