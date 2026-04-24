"use client";

import { useAccount, useReadContract } from "wagmi";
import { ICO_ABI, ICO_ADDRESS } from "@/constants/web3";

export const useAdmin = () => {
  const { address: connectedAddress } = useAccount();

  // We fetch the owner address directly from your contract info
  const { data: contractInfo } = useReadContract({
    address: ICO_ADDRESS,
    abi: ICO_ABI,
    functionName: "getContractInfo",
  });

  const ownerAddress = contractInfo?.[0]; // address is index 0 in your return

  // Boolean check: Is the current user the owner?
  const isAdmin =
    connectedAddress?.toLowerCase() === ownerAddress?.toLowerCase();

  return { isAdmin, ownerAddress, connectedAddress };
};
