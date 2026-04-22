import React, { useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWatchContractEvents,
  useBalance,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import Icons from "../Global/SVG";

const AGRI_CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
// Note: Use the ABI you provided here

const PurchaseHistory = ({ isDarkMode }) => {
  const [purchases, setPurchases] = useState([]);

  useWatchContractEvents({
    address: AGRI_CONTRACT_ADDRESS,
    abi: AGRI_ABI,
    eventName: "TokensPurchased", // Matches your ABI event
    onLogs(logs) {
      const newEntries = logs.map((log) => ({
        id: log.transactionHash,
        buyer: log.args.buyer,
        amount: Number(log.args.tokensBought) / 1e18, // Matches log field 'tokensBought'
        ethAmount: formatEther(log.args.amount || 0n), // Matches log field 'amount'
        timestamp: Date.now(),
      }));
      setPurchases((prev) => [...newEntries, ...prev].slice(0, 10));
    },
  });

  return (
    <div
      className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3
          className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          📊 Live Activity
        </h3>
        <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-1 rounded-full animate-pulse font-bold">
          BLOCKCHAIN LIVE
        </span>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {purchases.length === 0 ? (
          <p className="text-center py-8 text-sm text-gray-500 italic border-2 border-dashed border-gray-800 rounded-xl">
            Waiting for purchase events...
          </p>
        ) : (
          purchases.map((tx) => (
            <div
              key={tx.id}
              className={`flex items-center justify-between p-3 rounded-xl border ${isDarkMode ? "bg-gray-800/40 border-gray-700" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center font-mono text-[10px] text-green-500">
                  TX
                </div>
                <div>
                  <p
                    className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {tx.amount.toLocaleString()} AGT
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    {tx.buyer.slice(0, 6)}...{tx.buyer.slice(-4)}
                  </p>
                </div>
              </div>
              <p className="text-sm font-mono font-bold text-green-500">
                {tx.ethAmount} ETH
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AdminOverview = ({ isDarkMode = true }) => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [salePrice, setSalePrice] = useState("");
  const [uiFeedback, setUiFeedback] = useState({ msg: "", type: "" });

  // --- UPDATED CONTRACT READS (Matching your ABI) ---
  const { data: owner } = useReadContract({
    address: AGRI_CONTRACT_ADDRESS,
    abi: AGRI_ABI,
    functionName: "i_owner", // Changed from 'owner'
  });
  const { data: tokensSold } = useReadContract({
    address: AGRI_CONTRACT_ADDRESS,
    abi: AGRI_ABI,
    functionName: "tokensSold",
  });
  const { data: currentPrice } = useReadContract({
    address: AGRI_CONTRACT_ADDRESS,
    abi: AGRI_ABI,
    functionName: "ethPriceForToken",
  });
  const { data: ethRaised } = useBalance({ address: AGRI_CONTRACT_ADDRESS });

  const showFeedback = (msg, type = "success") => {
    setUiFeedback({ msg, type });
    setTimeout(() => setUiFeedback({ msg: "", type: "" }), 4000);
  };

  // --- UPDATED HANDLERS ---
  const handleUpdatePrice = async () => {
    if (!salePrice || isNaN(salePrice))
      return showFeedback("Enter valid price", "error");
    try {
      await writeContractAsync({
        address: AGRI_CONTRACT_ADDRESS,
        abi: AGRI_ABI,
        functionName: "updateTokenPrice", // Changed from 'setPrice'
        args: [parseEther(salePrice)],
      });
      showFeedback("Price updated on-chain!");
      setSalePrice("");
    } catch (e) {
      showFeedback(e.shortMessage || "Update failed", "error");
    }
  };

  const handleWithdraw = async () => {
    if (!window.confirm("Confirm withdrawal of ALL ETH to treasury?")) return;
    try {
      await writeContractAsync({
        address: AGRI_CONTRACT_ADDRESS,
        abi: AGRI_ABI,
        functionName: "withdrawAllTokens", // Changed from 'withdrawFunds'
      });
      showFeedback("ETH withdrawal initiated!");
    } catch (e) {
      showFeedback(e.shortMessage || "Action failed", "error");
    }
  };

  const isOwner = address?.toLowerCase() === owner?.toLowerCase();

  if (!isConnected || !isOwner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="p-4 bg-red-500/10 rounded-full mb-4">
          <Icons.ErrorXMark size={48} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-white">Access Denied</h2>
        <p className="text-gray-500 max-w-sm mt-2">
          This vault is restricted to the contract owner (
          {owner ? `${owner.slice(0, 6)}...` : "Loading..."}).
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 space-y-8 animate-fadeIn ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            Admin{" "}
            <span className="text-green-500 underline decoration-green-500/30">
              Vault
            </span>
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Status: Authorized Operator
          </p>
        </div>
        {uiFeedback.msg && (
          <div
            className={`px-4 py-2 rounded-lg text-xs font-bold animate-bounce ${uiFeedback.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
          >
            {uiFeedback.msg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Treasury ETH",
            value: ethRaised
              ? `${parseFloat(ethRaised.formatted).toFixed(4)}`
              : "0.00",
            icon: <Icons.TokenETH size={20} />,
          },
          {
            label: "AGT Distributed",
            value: tokensSold
              ? (Number(tokensSold) / 1e18).toLocaleString()
              : "0",
            icon: <Icons.TokenIcon size={20} />,
          },
          {
            label: "Current Price",
            value: currentPrice ? `${formatEther(currentPrice)} ETH` : "---",
            icon: <Icons.SuccessCheckmark size={20} />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-gray-900 border border-gray-800"
          >
            <div className="text-green-500 mb-3">{stat.icon}</div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              {stat.label}
            </p>
            <h4 className="text-2xl font-black text-white mt-1">
              {stat.value}
            </h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <PurchaseHistory isDarkMode={isDarkMode} />

          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl flex flex-col gap-4">
            <h3 className="text-white font-bold text-sm">
              Emergency Functions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-4 border-2 border-dashed border-gray-800 rounded-xl hover:border-orange-500 hover:bg-orange-500/10 transition-all group">
                <span className="text-gray-500 group-hover:text-orange-500 font-bold text-xs uppercase">
                  Rescue Stuck Tokens
                </span>
              </button>
              <button className="py-4 border-2 border-dashed border-gray-800 rounded-xl hover:border-red-500 hover:bg-red-500/10 transition-all group">
                <span className="text-gray-500 group-hover:text-red-500 font-bold text-xs uppercase">
                  Emergency Shutdown
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-800 shadow-xl shadow-green-900/20">
            <h3 className="text-white font-black text-lg mb-4">
              Financial Release
            </h3>
            <div className="bg-white/10 rounded-2xl p-4 mb-6">
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">
                Available Balance
              </p>
              <p className="text-white text-2xl font-black">
                {ethRaised?.formatted.slice(0, 8)} ETH
              </p>
            </div>
            <button
              onClick={handleWithdraw}
              className="w-full py-4 bg-white text-green-700 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-lg transition-all active:scale-95"
            >
              Withdraw All Funds
            </button>
          </div>

          <div className="p-6 bg-gray-900 border border-gray-800 rounded-3xl">
            <h3 className="text-white font-bold text-sm mb-4">
              Price Configuration
            </h3>
            <div className="space-y-4">
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="New ETH per AGT"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-green-500 outline-none"
              />
              <button
                onClick={handleUpdatePrice}
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              >
                Update Token Price
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
