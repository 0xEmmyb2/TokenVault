"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CircleAlert,
  Loader2,
  MoveRight,
  TrendingDown,
  TrendingUp,
  History,
} from "lucide-react";
import { useVault } from "@/features/dashboard/hooks/useVault";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

const SUMMARY_METRICS = [
  { label: "Staked Tokens Trend", value: "-0.82%", sub: "24H", down: true },
  { label: "Price", value: "$41.99", sub: "-10.9%", down: true },
  { label: "Staking Ratio", value: "60.6%", sub: "24H" },
  { label: "Reward Rate", value: "2.23%", sub: "24H Ago" },
];

export default function DashboardPage() {
  const { isConnected, isConnecting, address } = useAccount();
  const router = useRouter();
  const { userBalance, isPending, error, icoData } = useVault();

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push("/");
    }
  }, [isConnected, isConnecting, router]);

  if (isConnecting) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <LoadingSpinner size={64} />
      </div>
    );
  }

  if (!isConnected) return null;

  const walletLabel = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Connected";

  const metrics = [
    {
      label: "Current Price",
      value: icoData ? `${icoData.displayPrice} ETH` : "0.001 ETH",
      sub: "Fixed",
      down: false
    },
    {
      label: "Tokens for Sale",
      value: icoData ? Number(icoData.liquidity).toLocaleString() : "0",
      sub: "Available",
      down: false
    },
    {
      label: "Tokens Sold",
      value: icoData ? Number(icoData.tokensSold).toLocaleString() : "0",
      sub: "Volume",
      down: false
    },
    {
      label: "Token Symbol",
      value: icoData?.symbol || "TKN",
      sub: "Active",
      down: false
    },
  ];

  return (
    <div className="space-y-6 pb-8 transition-colors duration-300">
      <section className="grid gap-6">
        <div className="flex flex-col items-center justify-center rounded-[34px] border border-border bg-card p-12 shadow-sm text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            Vault Overview
          </h1>
          <p className="mt-4 text-foreground/50 max-w-md mx-auto text-lg">
            Monitor your asset distribution and market performance.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.4fr]">
        <div className="space-y-6">
          {/* VAULT INTELLIGENCE SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
              <p className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Vault Liquidity</p>
              <div className="mt-6 flex items-baseline gap-2">
                <p className="text-5xl font-black tracking-[-0.05em] text-foreground">
                  {Number(icoData?.liquidity || 0).toLocaleString()}
                </p>
                <span className="text-xl font-bold text-foreground/30">{icoData?.symbol}</span>
              </div>
              <p className="mt-4 text-xs font-medium text-foreground/40 leading-relaxed">
                Current tokens available in the contract for acquisition.
              </p>
            </div>

            <div className="rounded-[32px] border border-border bg-card p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <TrendingUp size={120} />
              </div>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Your Holdings</p>
              <div className="mt-6 flex items-baseline gap-2">
                <p className="text-5xl font-black tracking-[-0.05em] text-foreground">
                  {Number(userBalance || 0).toLocaleString()}
                </p>
                <span className="text-xl font-bold text-foreground/30">{icoData?.symbol}</span>
              </div>
              <p className="mt-4 text-xs font-medium text-foreground/40 leading-relaxed">
                Tokens held in your connected wallet from recent interactions.
              </p>
            </div>
          </div>

          {/* GRAPH PLACEHOLDER */}
          <div className="rounded-[32px] border border-border bg-card p-8 shadow-sm min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">Market Analytics</h3>
                <p className="text-xs text-foreground/40 mt-1 uppercase tracking-widest font-black">Graph Protocol Integration Pending</p>
              </div>
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" />
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="h-2 w-2 rounded-full bg-foreground/10" />
              </div>
            </div>

            <div className="flex-1 rounded-[24px] border-2 border-dashed border-foreground/5 bg-foreground/[0.01] flex flex-col items-center justify-center text-center p-10 group">
              <div className="h-20 w-20 rounded-full bg-foreground/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="text-foreground/20" size={40} />
              </div>
              <h4 className="text-xl font-bold text-foreground/60 uppercase tracking-tighter">Analytical Surface Ready</h4>
              <p className="mt-3 text-sm text-foreground/30 max-w-sm leading-relaxed">
                This space is reserved for your Graph Protocol implementation. Connect your subgraphs to visualize real-time vault metrics.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[24px] border border-border bg-card p-5 transition-all hover:border-brand/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground/35">
                    {metric.label}
                  </p>
                  <span className="rounded-full border border-border bg-foreground/5 px-2.5 py-1 text-[10px] text-foreground/58">
                    {metric.sub}
                  </span>
                </div>
                <div className="mt-6 flex items-end gap-2">
                  <p className="text-3xl font-bold tracking-[-0.05em] text-foreground">
                    {metric.value}
                  </p>
                  {metric.down ? (
                    <TrendingDown className="mb-1 h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingUp className="mb-1 h-4 w-4 text-brand" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Activity</h3>
              <button
                onClick={() => router.push("/purchase-history")}
                className="text-xs text-brand font-semibold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-foreground/5 flex items-center justify-center mb-4 text-foreground/20">
                <History className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-foreground/60">No recent activity</p>
              <p className="text-xs text-foreground/30 mt-1">Your purchase history will appear here</p>
            </div>
          </div>
        </div>
      </section>


      {isPending ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/45 backdrop-blur-md">
          <div className="rounded-[28px] border border-border bg-card p-6 text-center shadow-2xl">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-brand" />
            <p className="mt-4 text-lg font-medium text-foreground">
              Processing transaction
            </p>
            <p className="mt-2 text-sm text-foreground/55">
              Confirm the action in your wallet to continue.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Insight({
  title,
  subtitle,
  value,
  down,
}: {
  title: string;
  subtitle: string;
  value: string;
  down?: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-border bg-foreground/[0.02] p-4 transition-all hover:border-brand/30">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-xs text-foreground/40">{subtitle}</p>
      <div className="mt-4 flex items-center gap-2">
        <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {value}
        </p>
        {down ? (
          <TrendingDown className="h-4 w-4 text-red-500" />
        ) : (
          <TrendingUp className="h-4 w-4 text-brand" />
        )}
      </div>
    </div>
  );
}
