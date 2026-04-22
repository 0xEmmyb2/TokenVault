import React, { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import Icons from "../Global/SVG";

// --- CONFIGURATION ---
const AGRI_CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
const AGRI_ABI = [
  /* Use the same ABI from AdminOverview */
];

const TokenCalculator = ({ isDarkMode = true }) => {
  const [ethAmount, setEthAmount] = useState("");
  const [agtResult, setAgtResult] = useState("0");

  // --- CONTRACT READ: Get current price ---
  const { data: pricePerTokenWei } = useReadContract({
    address: AGRI_CONTRACT_ADDRESS,
    abi: AGRI_ABI,
    functionName: "ethPriceForToken",
  });

  // --- CALCULATION LOGIC ---
  useEffect(() => {
    if (pricePerTokenWei && ethAmount && !isNaN(ethAmount)) {
      const priceInEth = parseFloat(formatEther(pricePerTokenWei));

      if (priceInEth > 0) {
        // Calculation: Tokens = ETH Input / Price Per Token
        const calculated = parseFloat(ethAmount) / priceInEth;
        setAgtResult(
          calculated.toLocaleString(undefined, { maximumFractionDigits: 2 }),
        );
      }
    } else {
      setAgtResult("0");
    }
  }, [ethAmount, pricePerTokenWei]);

  const containerBase = isDarkMode
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-200";
  const inputBase = isDarkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-gray-50 border-gray-200 text-gray-900";

  return (
    <div
      className={`p-8 rounded-3xl border shadow-xl max-w-md mx-auto ${containerBase}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Icons.TokenIcon size={24} className="text-green-500" />
        </div>
        <div>
          <h3
            className={`font-black text-xl tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            Price <span className="text-green-500">Calculator</span>
          </h3>
          <p className="text-xs text-gray-500 font-medium">
            Real-time AGT/ETH conversion
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* ETH INPUT */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">
            You Pay (ETH)
          </label>
          <div className="relative">
            <input
              type="number"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              placeholder="0.00"
              className={`w-full px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-mono text-lg ${inputBase}`}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Icons.TokenETH size={18} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400">ETH</span>
            </div>
          </div>
        </div>

        {/* SWAP ICON */}
        <div className="flex justify-center -my-2 relative z-10">
          <div
            className={`p-2 rounded-full border-4 ${isDarkMode ? "bg-gray-900 border-gray-950" : "bg-white border-gray-50 text-gray-400"}`}
          >
            <Icons.ArrowDown size={16} className="text-green-500" />
          </div>
        </div>

        {/* AGT OUTPUT */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">
            You Receive (AGT)
          </label>
          <div
            className={`w-full px-5 py-4 rounded-2xl font-mono text-lg flex justify-between items-center ${isDarkMode ? "bg-black/40 border border-gray-800" : "bg-gray-100 border border-gray-200 text-gray-900"}`}
          >
            <span
              className={
                agtResult === "0" ? "text-gray-600" : "text-green-500 font-bold"
              }
            >
              {agtResult}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
              Tokens
            </span>
          </div>
        </div>

        {/* CURRENT PRICE INFO */}
        <div
          className={`p-4 rounded-2xl flex justify-between items-center ${isDarkMode ? "bg-gray-800/30" : "bg-gray-50"}`}
        >
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Current Rate:
          </span>
          <span
            className={`text-xs font-mono font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            1 AGT = {pricePerTokenWei ? formatEther(pricePerTokenWei) : "..."}{" "}
            ETH
          </span>
        </div>

        <button className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]">
          Buy Tokens Now
        </button>
      </div>
    </div>
  );
};

export default TokenCalculator;
