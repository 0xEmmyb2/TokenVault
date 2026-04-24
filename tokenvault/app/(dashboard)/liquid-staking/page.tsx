"use client";

import { useState } from "react";
import { ArrowLeftRight, Coins, TimerReset } from "lucide-react";

export default function LiquidStakingPage() {
  const [amount, setAmount] = useState("12.5");
  const [mode, setMode] = useState<"mint" | "redeem">("mint");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#ddd2ff]">
            Beta feature
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
            Liquid Staking
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
            Stake assets and receive a liquid receipt token back, so treasury
            capital can keep earning while still staying useful in DeFi.
          </p>
        </div>
        <span className="rounded-full border border-[#b8a7ff]/20 bg-[#aa95ff]/10 px-4 py-2 text-sm text-[#ddd2ff]">
          stAGT preview mode
        </span>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-6">
          <div className="grid grid-cols-2 gap-2 rounded-[22px] border border-white/8 bg-[#0d111f] p-1.5">
            <button
              type="button"
              onClick={() => setMode("mint")}
              className={`rounded-2xl px-4 py-3 text-sm transition ${mode === "mint" ? "bg-white/10 text-white" : "text-white/45"}`}
            >
              Mint
            </button>
            <button
              type="button"
              onClick={() => setMode("redeem")}
              className={`rounded-2xl px-4 py-3 text-sm transition ${mode === "redeem" ? "bg-white/10 text-white" : "text-white/45"}`}
            >
              Redeem
            </button>
          </div>

          <div className="mt-6 rounded-[26px] border border-white/8 bg-[#101425] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              {mode === "mint" ? "ETH to stAGT" : "stAGT to ETH"}
            </p>
            <div className="mt-4 flex items-center justify-between rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4">
              <div>
                <p className="text-sm text-white/45">Amount</p>
                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="mt-2 bg-transparent text-4xl font-semibold tracking-[-0.05em] text-white outline-none"
                />
              </div>
              <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                {mode === "mint" ? "ETH" : "stAGT"}
              </span>
            </div>

            <div className="my-4 flex justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <ArrowLeftRight className="h-4 w-4 text-[#d7ccff]" />
              </div>
            </div>

            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-sm text-white/45">You receive</p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-white">
                {amount || "0"} {mode === "mint" ? "stAGT" : "ETH"}
              </p>
            </div>

            <button className="mt-6 w-full rounded-2xl bg-[#d7ccff] px-5 py-4 text-sm font-medium text-[#120f26] transition hover:bg-[#c6b9ff]">
              {mode === "mint" ? "Mint stAGT" : "Redeem to ETH"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <FeatureCard
            icon={<Coins className="h-5 w-5 text-[#8effdd]" />}
            title="Utility Links"
            description="Use your liquid receipt token as collateral, route it into lending markets, or keep it inside the vault strategy stack."
          />
          <FeatureCard
            icon={<TimerReset className="h-5 w-5 text-[#ffcc85]" />}
            title="Unstaking Period"
            description="Redeeming back to the original asset may take 3 to 7 days depending on queue depth and validator settlement."
          />
          <FeatureCard
            icon={<ArrowLeftRight className="h-5 w-5 text-[#d7ccff]" />}
            title="Mint / Redeem Flow"
            description="Swap between base asset and liquid asset with a clean interface that makes the staking receipt legible."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
        {icon}
      </div>
      <p className="mt-4 text-lg font-medium text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
    </div>
  );
}
