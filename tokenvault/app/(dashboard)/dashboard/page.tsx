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
} from "lucide-react";
import { AssetGrid } from "@/features/dashboard/components/AssetGrid";
import { useVault } from "@/features/dashboard/hooks/useVault";

const SUMMARY_METRICS = [
  { label: "Staked Tokens Trend", value: "-0.82%", sub: "24H", down: true },
  { label: "Price", value: "$41.99", sub: "-10.9%", down: true },
  { label: "Staking Ratio", value: "60.6%", sub: "24H" },
  { label: "Reward Rate", value: "2.23%", sub: "24H Ago" },
];

export default function DashboardPage() {
  const { isConnected, isConnecting, address } = useAccount();
  const router = useRouter();
  const { balance, isPending, error } = useVault();

  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push("/");
    }
  }, [isConnected, isConnecting, router]);

  if (isConnecting) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#d7ccff]" />
      </div>
    );
  }

  if (!isConnected) return null;

  const walletLabel = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Connected";

  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,15,25,0.98),rgba(10,11,20,0.95))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-4 border-b border-white/8 pb-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                Recommended coins for 24 hours
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                Top Staking Assets
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-white/58">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                3 Assets
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                24H
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Proof of Stake
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Desc
              </span>
            </div>
          </div>

          <div className="mt-6">
            <AssetGrid />
          </div>
        </div>

        <aside className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,20,38,0.95),rgba(96,74,196,0.92))] p-6 shadow-[0_30px_90px_rgba(52,36,111,0.4)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white/90">TokenVault</p>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85">
              New
            </span>
          </div>

          <h2 className="mt-8 text-4xl font-semibold leading-tight tracking-[-0.05em] text-white">
            Liquid Staking Portfolio
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/72">
            An all-in-one cockpit that helps your team manage ERC20 holdings,
            wallet actions, and treasury staking from a single interface.
          </p>

          <div className="mt-10 space-y-3">
            <button className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-medium text-white transition hover:bg-white/15">
              Wallet Connected
            </button>
            <button className="w-full rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-sm font-medium text-white/80 transition hover:bg-white/10">
              View wallet address
            </button>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/15 bg-black/15 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/42">
                  Connected wallet
                </p>
                <p className="mt-2 text-lg font-medium text-white">
                  {walletLabel}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white/55" />
            </div>

            <div className="mt-6 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[68%] rounded-full bg-[linear-gradient(90deg,#d7ccff,#ffffff)] shadow-[0_0_24px_rgba(215,204,255,0.5)]" />
            </div>
            <div className="mt-4 flex justify-between text-xs text-white/50">
              <span>Wallet ready</span>
              <span>Allocation 68%</span>
            </div>
          </div>
        </aside>
      </section>

      {error ? (
        <div className="flex items-start gap-3 rounded-[24px] border border-[#ff8da0]/20 bg-[#ff8da0]/8 p-4 text-[#ffc4cf]">
          <CircleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-white">Vault interaction issue</p>
            <p className="mt-1 text-[#ffc4cf]/85">
              {"shortMessage" in error && typeof error.shortMessage === "string"
                ? error.shortMessage
                : error.message}
            </p>
          </div>
        </div>
      ) : null}

      <section className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(14,16,27,0.98),rgba(11,13,21,0.95))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
        <div className="flex flex-col gap-5 border-b border-white/8 pb-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/38">
              Your active staking
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">
                Stake Avalanche (AVAX)
              </h2>
              <span className="rounded-xl bg-[#ff6b63] px-2.5 py-1 text-xs font-medium text-white">
                AVAX
              </span>
            </div>
            <p className="mt-3 text-sm text-white/45">
              Last update 45 minutes ago. Keep watching contribution flow,
              position momentum, and reward behavior.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                  Current reward balance
                </p>
                <p className="mt-3 text-5xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
                  31.39686
                </p>
              </div>
              <button className="rounded-2xl bg-[#d5c9ff] px-5 py-3 text-sm font-medium text-[#120f26] transition hover:bg-[#c6b7ff]">
                Upgrade
              </button>
              <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                Unstake
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <Insight title="Momentum" subtitle="Growth dynamics" value="-0.82%" down />
              <Insight title="General" subtitle="Overview" value="$41.99" />
              <Insight title="Risk" subtitle="Risk assessment" value="60.6%" />
              <Insight title="Reward" subtitle="Expected profit" value="2.23%" />
            </div>
          </div>

          <div className="w-full max-w-md rounded-[28px] border border-white/8 bg-[#121528] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                  Investment Period
                </p>
                <p className="mt-1 text-sm text-white/45">
                  Contribution period (month)
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                6 Month
              </span>
            </div>

            <div className="mt-10">
              <div className="relative h-10">
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(216,206,255,0.5),rgba(255,255,255,0.08))]" />
                <div className="absolute left-[68%] top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-[#1c2140] px-3 py-1 text-[11px] text-white/80">
                    4 Month
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d7ccff]/40 bg-[#d7ccff] shadow-[0_0_24px_rgba(215,204,255,0.4)]">
                    <span className="h-2 w-2 rounded-full bg-[#1d173c]" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between text-xs text-white/38">
              <span>1 month</span>
              <span>4 months</span>
              <span>6 months</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SUMMARY_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                  {metric.label}
                </p>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/58">
                  {metric.sub}
                </span>
              </div>
              <div className="mt-6 flex items-end gap-2">
                <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
                  {metric.value}
                </p>
                {metric.down ? (
                  <TrendingDown className="mb-1 h-4 w-4 text-[#ff8ca0]" />
                ) : (
                  <TrendingUp className="mb-1 h-4 w-4 text-[#81ffe0]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Wallet balance
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-5xl font-semibold tracking-[-0.05em] text-white">
              {balance}
            </p>
            <span className="mb-1 text-sm text-white/45">AGT in vault</span>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
            Your connected wallet is synced with the staking workspace and can
            continue into deposits, purchases, or claim flows.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">
            Next action
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
            Review vault allocation
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Compare active pools before sending a new ERC20 position into the
            vault.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white transition hover:bg-white/10">
            Open allocation desk
            <MoveRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {isPending ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-md">
          <div className="rounded-[28px] border border-white/10 bg-[#10131f] p-6 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#d7ccff]" />
            <p className="mt-4 text-lg font-medium text-white">
              Processing transaction
            </p>
            <p className="mt-2 text-sm text-white/55">
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
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="mt-1 text-xs text-white/40">{subtitle}</p>
      <div className="mt-4 flex items-center gap-2">
        <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
          {value}
        </p>
        {down ? (
          <TrendingDown className="h-4 w-4 text-[#ff8ca0]" />
        ) : (
          <TrendingUp className="h-4 w-4 text-[#81ffe0]" />
        )}
      </div>
    </div>
  );
}
