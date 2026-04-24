"use client";

import { useReadContract } from "wagmi";
import { ICO_ABI, ICO_ADDRESS } from "@/constants/web3";

export const useVaultStats = () => {
  const { data, isLoading, refetch } = useReadContract({
    address: ICO_ADDRESS,
    abi: ICO_ABI,
    functionName: "getContractInfo",
  });

  // Mapping the array return from your Solidity getContractInfo()
  const stats = data
    ? {
        tokenAddress: data[0],
        symbol: data[1],
        decimals: data[2],
        availableLiquidity: data[3],
        priceInWei: data[4],
        totalTokensSold: data[5],
      }
    : null;

  return { stats, isLoading, refetch };
};
