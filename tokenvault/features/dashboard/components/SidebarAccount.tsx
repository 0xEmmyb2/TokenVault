"use client";

import { cn } from "@/lib/utils";
import { Flame, Layers3, Coins, Gem, Shield } from "lucide-react";

const POSITIONS = [
  {
    label: "Asset Ethereum",
    amount: "$7,699.00",
    icon: Gem,
    accent: "bg-[#7c87ff] text-white",
    muted: false,
  },
  {
    label: "Asset Avalanche",
    amount: "$1,340.00",
    icon: Flame,
    accent: "bg-[#ff6a5f] text-white",
    muted: false,
  },
  {
    label: "Asset Polygon",
    amount: "$540.00",
    icon: Coins,
    accent: "bg-[#a266ff] text-white",
    muted: false,
  },
  {
    label: "Asset Solana",
    amount: "$980.00",
    icon: Layers3,
    accent: "bg-[#1e293b] text-[#7fffd4]",
    muted: true,
  },
];

export const SidebarAccount = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-white/8 bg-[#0f1220] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/35">
              Active staking
            </p>
            <p className="mt-2 text-sm font-medium text-white">
              6 running positions
            </p>
          </div>
          <span className="rounded-full border border-[#b8a7ff]/30 bg-[#aa95ff]/10 px-2.5 py-1 text-xs text-[#ddd2ff]">
            6
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {POSITIONS.map((position) => {
            const Icon = position.icon;

            return (
              <div
                key={position.label}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-3 transition",
                  position.muted
                    ? "bg-white/[0.02] text-white/35"
                    : "bg-white/[0.04] hover:bg-white/[0.06]",
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl text-sm shadow-[0_0_20px_rgba(0,0,0,0.18)]",
                    position.accent,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-white/85">
                    {position.label}
                  </p>
                  <p className="text-xs text-white/45">
                    Amount {position.amount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,37,0.9),rgba(29,19,60,0.95))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-[#d8cdff]">
          <Shield className="h-4 w-4" />
        </div>
        <p className="mt-4 text-sm font-medium text-white">Activate Super</p>
        <p className="mt-2 text-xs leading-5 text-white/55">
          Unlock all portfolio insights and advanced staking controls for your
          treasury wallet.
        </p>
        <button className="mt-4 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white transition hover:bg-white/12">
          Upgrade workspace
        </button>
      </div>
    </div>
  );
};
