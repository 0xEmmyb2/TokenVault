"use client";

import { useAccount, useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { useVaultStats } from "./useVaultData";

export const useUserPurchase = () => {
  const { address } = useAccount();
  const { stats } = useVaultStats();

  // We read the balance from the Token contract, not the ICO contract
  const {
    data: balance,
    isLoading,
    refetch,
  } = useReadContract({
    address: stats?.tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!stats?.tokenAddress,
    },
  });

  return {
    balance: balance || 0,
    symbol: stats?.symbol || "Tokens",
    decimals: stats?.decimals || 18,
    isLoading,
  };
};
