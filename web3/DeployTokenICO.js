import hre from "hardhat";

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const network = await hre.ethers.provider.getNetwork();
    console.log("Network:", network.name);

    //Deploy the TokenICO Contract
    console.log("\nDeploying the TokenICO contract...");
    const TokenICO = await hre.ethers.getContractFactory("TokenICO");
    const tokenICO = await TokenICO.deploy();

    await tokenICO.deployed();

    console.log("\nDeployment Successful!");
    console.log("------------------------");
    console.log("\nNEXT_PUBLIC_TOKEN_ICO_ADDRESS:", tokenICO.address);
    console.log("\nNEXT_PUBLIC_OWNER_ADDRESS:", deployer.address);
}