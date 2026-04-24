"use client";

import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { parseEther, formatEther } from "viem";
import { vaultAbi } from "@/constants/abis";
import { VAULT_ADDRESS } from "@/constants/addresses";
import { useEffect } from "react";

export function useVault() {
  const { address } = useAccount();
  const {
    writeContract,
    data: hash,
    isPending,
    isError,
    error,
  } = useWriteContract();

  // 1. Debugging: Global Unhandled Rejection Listener
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.log("🔍 Caught Hidden Error:", event.reason);
      if (event.reason?.cause) {
        console.log("🔗 Error Cause:", event.reason.cause);
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () =>
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
  }, []);

  // 2. Debugging: Specific Contract Error Logger
  useEffect(() => {
    if (isError && error) {
      console.error("Vault Contract Error:", error);
      if ("shortMessage" in (error as any)) {
        console.log("Readable Message:", (error as any).shortMessage);
      }
    }
  }, [isError, error]); // Added dependency array here

  // 3. Read: Get User Balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: VAULT_ADDRESS,
    abi: vaultAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // 4. Write: Deposit
  const deposit = async (amount: string) => {
    if (!amount || isNaN(Number(amount))) return;
    writeContract({
      address: VAULT_ADDRESS,
      abi: vaultAbi,
      functionName: "deposit",
      args: [parseEther(amount)],
    });
  };

  // 5. Write: Buy Tokens (The missing function!)
  const buyTokens = async (amount: string) => {
    if (!amount || isNaN(Number(amount))) return;
    writeContract({
      address: VAULT_ADDRESS,
      abi: vaultAbi,
      functionName: "buyToken",
    });
  };

  // 6. Write: Withdraw
  const withdraw = async (amount: string) => {
    if (!amount || isNaN(Number(amount))) return;
    writeContract({
      address: VAULT_ADDRESS,
      abi: vaultAbi,
      functionName: "withdraw",
      args: [parseEther(amount)],
    });
  };

  return {
    balance: balance ? formatEther(balance as bigint) : "0",
    hash,
    isPending,
    isError,
    error,
    deposit,
    withdraw,
    buyTokens,
    refetchBalance,
  };
}
