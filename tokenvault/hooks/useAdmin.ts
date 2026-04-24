"use client";

import { useAccount, useReadContract } from "wagmi";
import { ICO_ABI, ICO_ADDRESS } from "@/constants/web3";

export const useAdmin = () => {
  const { address: connectedAddress } = useAccount();

  const { data: ownerAddress, isLoading } = useReadContract({
    address: ICO_ADDRESS,
    abi: ICO_ABI,
    functionName: "i_owner",
  });

  const isAdmin =
    connectedAddress &&
    ownerAddress &&
    connectedAddress.toLowerCase() === (ownerAddress as string).toLowerCase();

  return {
    isAdmin: !!isAdmin,
    ownerAddress: ownerAddress as `0x${string}`,
    connectedAddress, // Add this line!
    isLoading,
  };
};
