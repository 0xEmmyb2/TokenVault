"use client";

import { ArrowUpRight, ShieldCheck, TrendingUp, Wifi } from "lucide-react";

const PROVIDERS = [
  {
    name: "Lido Prime",
    type: "Institutional pool",
    apy: "8.62%",
    uptime: "99.98%",
    fee: "8%",
    risk: "Low Risk",
    accent: "#d8ccff",
  },
  {
    name: "Coinbase Validator",
    type: "Regulated validator",
    apy: "7.94%",
    uptime: "99.95%",
    fee: "10%",
    risk: "Low Risk",
    accent: "#8ce8ff",
  },
  {
    name: "Nebula Node",
    type: "Independent operator",
    apy: "11.43%",
    uptime: "98.91%",
    fee: "5%",
    risk: "High Yield",
    accent: "#ffb38f",
  },
  {
    name: "Polygon Relay",
    type: "Multi-chain pool",
    apy: "9.18%",
    uptime: "99.72%",
    fee: "6%",
    risk: "Balanced",
    accent: "#bb92ff",
  },
];

export default function ProvidersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/35">
            Provider marketplace
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
            Staking Providers
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
            Compare validators and pools before delegating treasury capital.
            This view focuses on yield, reliability, commission structure, and
            operational risk.
          </p>
        </div>

        <div className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-4 text-sm text-white/65">
          4 curated providers available for delegation
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {PROVIDERS.map((provider) => (
          <article
            key={provider.name}
            className="rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-[#090b14]"
                  style={{ backgroundColor: provider.accent }}
                >
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">{provider.name}</p>
                  <p className="text-sm text-white/45">{provider.type}</p>
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                {provider.risk}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Metric title="APY" value={provider.apy} icon={<TrendingUp className="h-4 w-4 text-[#81ffe0]" />} />
              <Metric title="Uptime" value={provider.uptime} icon={<Wifi className="h-4 w-4 text-[#d8ccff]" />} />
              <Metric title="Commission" value={provider.fee} icon={<ArrowUpRight className="h-4 w-4 text-[#ffb38f]" />} />
            </div>

            <div className="mt-6 flex items-center justify-between rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                  Delegation stance
                </p>
                <p className="mt-2 text-sm text-white/60">
                  Suitable for active staking strategies and ERC20 treasury
                  routing.
                </p>
              </div>
              <button className="rounded-2xl bg-[#d7ccff] px-4 py-3 text-sm font-medium text-[#120f26] transition hover:bg-[#c6b9ff]">
                Join Provider
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Metric({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-white/35">{title}</p>
        {icon}
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
        {value}
      </p>
    </div>
  );
}
