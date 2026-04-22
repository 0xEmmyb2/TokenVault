import React, { useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseUnits } from "viem";
import Icons from "../Global/SVG";

// --- CONFIGURATION ---
// Note: This should be your ERC20 Token Address, NOT the ICO address
const TOKEN_CONTRACT_ADDRESS = "0xYourAgriTokenAddress";
const TOKEN_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const TokenTransfer = ({ isDarkMode = true }) => {
  const { isConnected } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  // --- WAGMI HOOKS ---
  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!recipient || !amount) return;

    try {
      await writeContractAsync({
        address: TOKEN_CONTRACT_ADDRESS,
        abi: TOKEN_ABI,
        functionName: "transfer",
        args: [recipient, parseUnits(amount, 18)], // Standard 18 decimals for AGT
      });
    } catch (err) {
      console.error("Transfer failed:", err);
    }
  };

  return (
    <div
      className={`p-8 rounded-3xl border shadow-xl ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}
    >
      <div className="mb-6">
        <h2
          className={`text-2xl font-black tracking-tighter ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Send <span className="text-green-500">AGT</span>
        </h2>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Transfer tokens to any Ethereum wallet.
        </p>
      </div>

      <form onSubmit={handleTransfer} className="space-y-5">
        {/* RECIPIENT ADDRESS */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">
            Recipient Address
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className={`w-full px-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono text-sm ${
                isDarkMode
                  ? "bg-black border-gray-800 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-900"
              } border`}
            />
          </div>
        </div>

        {/* AMOUNT */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">
            Amount to Send
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono text-lg ${
                isDarkMode
                  ? "bg-black border-gray-800 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-900"
              } border`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-green-500 uppercase tracking-tighter">
              AGT
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={!isConnected || isPending || isConfirming}
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 ${
            !isConnected
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 active:scale-95"
          }`}
        >
          {isPending || isConfirming ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>{isPending ? "Confirming..." : "Sending..."}</span>
            </>
          ) : (
            <>
              <Icons.ArrowRight size={16} className="-rotate-45" />
              <span>Send Assets</span>
            </>
          )}
        </button>

        {/* STATUS FEEDBACK */}
        {isSuccess && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 animate-fadeIn">
            <Icons.SuccessCheckmark className="text-green-500" size={20} />
            <div>
              <p className="text-xs font-bold text-green-500">
                Transfer Successful!
              </p>
              <p className="text-[10px] text-green-500/60 font-mono truncate max-w-[200px]">
                {hash}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-shake">
            <Icons.ErrorXMark className="text-red-500" size={20} />
            <p className="text-[10px] font-bold text-red-500 leading-tight">
              {error.shortMessage ||
                "Transaction failed. Check balance or address."}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default TokenTransfer;
