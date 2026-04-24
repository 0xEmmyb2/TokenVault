"use client";

import { useVault } from "../hooks/useVault";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatUnits, parseEther } from "viem";
import { useState } from "react";
import { Zap, TrendingUp, Shield } from "lucide-react";

export const PurchaseTerminal = () => {
  const { icoData, buyTokens, isLoading } = useVault();
  const [amount, setAmount] = useState("0.1"); // Default ETH amount

  const handlePurchase = () => {
    if (!amount || isNaN(Number(amount))) return;
    buyTokens(parseEther(amount).toString());
  };

  return (
    <Card className="bg-[#0B0B0F] border-white/5 relative overflow-hidden">
      {/* Decorative gradient blur like in the screenshot */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -z-10" />

      <CardContent className="pt-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Live ICO Status — Update 1m ago
            </p>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white">
                Buy {icoData?.symbol || "Tokens"}
              </h2>
              <div className="bg-[#45ef56]/10 text-[#45ef56] text-[10px] px-2 py-1 rounded-md border border-[#45ef56]/20 font-bold">
                ACTIVE SALE
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 w-9 p-0">
              <TrendingUp size={16} />
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-4">
              View Contract
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Stats & Input */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">
                Your Contribution (ETH)
              </p>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-2xl font-bold text-white focus:outline-none focus:border-[#45ef56]/50 transition-all"
                  placeholder="0.0"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  ETH
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handlePurchase}
                className="flex-1 py-6 text-lg"
                variant="primary"
              >
                Confirm Purchase
              </Button>
              <Button
                variant="outline"
                className="px-6 py-6 border-white/10 hover:bg-white/5 text-gray-400"
              >
                Max
              </Button>
            </div>
          </div>

          {/* Right Side: Token Calculation (The "Investment Period" area in your photo) */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
            <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-6">
              Estimated Tokens
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Exchange Rate</span>
                <span className="text-white font-mono">
                  1 ETH ={" "}
                  {icoData ? (1e18 / Number(icoData.price)).toFixed(0) : "0"}{" "}
                  {icoData?.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-gray-400">Tokens to Receive</span>
                <span className="text-[#45ef56] text-2xl font-bold font-mono">
                  {icoData
                    ? (
                        Number(amount) *
                        (1e18 / Number(icoData.price))
                      ).toLocaleString()
                    : "0"}
                </span>
              </div>
            </div>

            {/* Visual Progress Bar like the screenshot */}
            <div className="mt-8">
              <div className="flex justify-between text-[10px] text-gray-500 mb-2 uppercase">
                <span>Tokens Sold</span>
                <span>Max Supply</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-[#45ef56] transition-all duration-1000"
                  style={{ width: "45%" }} // Calculate based on (tokensSold / liquidity)
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Metrics (Small cards at the bottom of the photo) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/5">
          <Metric label="Momentum" value="+12.5%" sub="Growth" />
          <Metric
            label="Price (ETH)"
            value={icoData ? formatUnits(icoData.price, 18) : "0"}
            sub="Fixed"
          />
          <Metric label="Security" value="Audited" sub="Shielded" />
          <Metric
            label="Tokens Left"
            value={
              icoData ? formatUnits(icoData.liquidity, icoData.decimals) : "0"
            }
            sub="Available"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const Metric = ({ label, value, sub }: any) => (
  <div className="space-y-1">
    <p className="text-[10px] text-gray-500 uppercase font-bold">{label}</p>
    <p className="text-lg font-bold text-white leading-none">{value}</p>
    <p className="text-[10px] text-gray-600">{sub}</p>
  </div>
);
