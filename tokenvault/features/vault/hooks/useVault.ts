"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ICO_ABI, ICO_ADDRESS } from "@/constants/web3";
import { erc20Abi } from "viem";

export const useICO = () => {
  const { address } = useAccount();

  // 1. Fetch Global ICO Info
  const { data: contractData, isLoading: isIcoLoading } = useReadContract({
    address: ICO_ADDRESS,
    abi: ICO_ABI,
    functionName: "getContractInfo",
  });

  // 2. Fetch User's Token Balance (Once saleToken address is known)
  const saleTokenAddress = contractData?.[0];

  const { data: userBalance } = useReadContract({
    address: saleTokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!saleTokenAddress && !!address },
  });

  // Mapping the data for easy UI use
  const ico = contractData
    ? {
        tokenAddress: contractData[0],
        symbol: contractData[1],
        decimals: contractData[2],
        liquidity: contractData[3],
        price: contractData[4],
        totalSold: contractData[5],
        userBalance: userBalance || 0n,
      }
    : null;

  // 3. Purchase Function
  const { writeContract, isPending: isBuying } = useWriteContract();

  const buyTokens = (ethAmountInWei: string) => {
    writeContract({
      address: ICO_ADDRESS,
      abi: ICO_ABI,
      functionName: "buyToken",
      value: BigInt(ethAmountInWei),
    });
  };

  return { ico, buyTokens, isLoading: isIcoLoading || isBuying };
};
