import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import Icons from "../Global/SVG";

// --- CONFIGURATION ---
const AGRI_CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
const AGRI_ABI = [
  /* Use the TokenICO ABI here */
];

const TokenSale = ({ isDarkMode = true }) => {
  const [ethAmount, setEthAmount] = useState("");
  const [tokenYield, setTokenYield] = useState("0");
  const { isConnected } = useAccount();

  // 1. Fetch current price from contract
  const { data: pricePerToken } = useReadContract({
    address: AGRI_CONTRACT_ADDRESS,
    abi: AGRI_ABI,
    functionName: "ethPriceForToken",
  });

  // 2. Setup Write Function
  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  // 3. Monitor Transaction Status
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // 4. Calculate expected tokens as user types
  useEffect(() => {
    if (pricePerToken && ethAmount && !isNaN(ethAmount) && ethAmount > 0) {
      const price = parseFloat(formatEther(pricePerToken));
      const result = parseFloat(ethAmount) / price;
      setTokenYield(
        result.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      );
    } else {
      setTokenYield("0");
    }
  }, [ethAmount, pricePerToken]);

  const handlePurchase = async () => {
    if (!ethAmount || ethAmount <= 0) return;

    try {
      await writeContractAsync({
        address: AGRI_CONTRACT_ADDRESS,
        abi: AGRI_ABI,
        functionName: "buyToken",
        value: parseEther(ethAmount), // Sends the ETH to the contract
      });
    } catch (err) {
      console.error("Purchase failed:", err);
    }
  };

  return (
    <div
      className={`p-8 rounded-3xl border shadow-2xl transition-all ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2
            className={`text-2xl font-black tracking-tighter ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Token <span className="text-green-500">Launchpad</span>
          </h2>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
            Live Public Sale
          </p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-green-500">
            CONTRACT ACTIVE
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* INPUT SECTION */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase ml-1">
            Investment Amount
          </label>
          <div
            className={`relative group rounded-2xl border-2 transition-all ${isDarkMode ? "bg-black border-gray-800 focus-within:border-green-500" : "bg-gray-50 border-gray-200 focus-within:border-green-500"}`}
          >
            <input
              type="number"
              placeholder="0.0"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className="w-full bg-transparent p-4 outline-none text-xl font-mono text-white"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
              <Icons.TokenETH size={14} className="text-gray-400" />
              <span className="text-xs font-bold text-white">ETH</span>
            </div>
          </div>
        </div>

        {/* CALCULATION PREVIEW */}
        <div
          className={`p-4 rounded-2xl border border-dashed ${isDarkMode ? "border-gray-800 bg-gray-800/30" : "border-gray-200 bg-gray-50"}`}
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Estimated Tokens:</span>
            <span className="text-green-500 font-black text-lg">
              {tokenYield} AGT
            </span>
          </div>
        </div>

        {/* ACTION BUTTON */}
        {!isConnected ? (
          <button className="w-full py-4 bg-gray-800 text-gray-400 rounded-2xl font-black uppercase text-xs cursor-not-allowed">
            Connect Wallet to Participate
          </button>
        ) : (
          <button
            onClick={handlePurchase}
            disabled={isPending || isConfirming || !ethAmount}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2 ${
              isPending || isConfirming
                ? "bg-gray-700 text-gray-400 cursor-wait"
                : "bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-900/40"
            }`}
          >
            {(isPending || isConfirming) && (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {isPending
              ? "Confirm in Wallet..."
              : isConfirming
                ? "Processing..."
                : "Purchase Tokens"}
          </button>
        )}

        {/* FEEDBACK MESSAGES */}
        {isSuccess && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
            <Icons.SuccessCheckmark className="text-green-500" size={18} />
            <div>
              <p className="text-xs font-bold text-green-500">
                Transaction Successful!
              </p>
              <a
                href={`https://etherscan.io/tx/${hash}`}
                target="_blank"
                className="text-[10px] text-green-500/60 underline decoration-green-500/20"
              >
                View on Etherscan
              </a>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <Icons.ErrorXMark className="text-red-500" size={18} />
            <p className="text-[10px] font-bold text-red-500">
              {error.shortMessage || "Transaction Failed"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <span className="text-[10px] font-bold text-gray-500">
            Min: 0.01 ETH
          </span>
        </div>
        <span className="text-[10px] font-bold text-gray-500">
          Price: {pricePerToken ? formatEther(pricePerToken) : "..."} ETH / AGT
        </span>
      </div>
    </div>
  );
};

export default TokenSale;
