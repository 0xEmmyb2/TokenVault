"use client";

import { useUserPurchase } from "@/hooks/useUserStakes";
import { formatUnits } from "viem";
import { cn } from "@/lib/utils";

export const SidebarHoldings = () => {
  const { balance, symbol, decimals, isLoading } = useUserPurchase();

  return (
    <div className="mt-auto pt-6 border-t border-white/5">
      <div className="px-4 mb-4 flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          Your Assets
        </span>
      </div>

      <div className="space-y-2 px-2">
        {/* Token Balance Card */}
        <div className="bg-gradient-to-br from-white/[0.05] to-transparent p-3 rounded-xl border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#45ef56]/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#45ef56] animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{symbol}</p>
                <p className="text-[10px] text-gray-500">Purchased</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-bold text-white">
                {isLoading
                  ? "..."
                  : Number(formatUnits(BigInt(balance), decimals)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
