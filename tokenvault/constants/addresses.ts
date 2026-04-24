export const VAULT_ADDRESS = "0xYourContractAddressHere"; // Replace with your actual deployed address

// Pro-tip: If you deploy to multiple chains, use this structure:
export const CONTRACT_ADDRESSES = {
  84532: "0xYourBaseSepoliaAddress", // Base Sepolia Chain ID
  11155111: "0xYourSepoliaAddress", // Ethereum Sepolia Chain ID
} as const;
