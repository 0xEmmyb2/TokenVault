import { ethers } from "hardhat";
import { ContractFactory } from "ethers";

async function main(): Promise<void> {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);
  console.log(
    "Balance:",
    (await ethers.provider.getBalance(deployer.address)).toString(),
  );

  console.log("\nDeploying TokenICO contract...");
  const TokenVault: ContractFactory = await ethers.getContractFactory("TokenVault");
  const tokenVault = await TokenVault.deploy();

  await tokenVault.waitForDeployment();

  console.log("TokenICO deployed to:", await tokenVault.getAddress());
  console.log("Owner:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
