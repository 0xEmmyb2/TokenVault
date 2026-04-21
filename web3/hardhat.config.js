import "@nomicfoundation/hardhat-ignition-ethers";
import dotenv from "dotenv";
dotenv.config();

const hardhatConfig = {
  solidity: "0.8.24",
  networks: {
    ethereumSepolia: {
      url: process.env.ETHEREUM_SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 84532,
    },
  },
};

export default hardhatConfig;
