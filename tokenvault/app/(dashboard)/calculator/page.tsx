"use client";

import { useMemo, useState } from "react";
import { BadgeDollarSign, ChartNoAxesCombined, Repeat2 } from "lucide-react";

const APY = 0.1272;

export default function CalculatorPage() {
  const [amount, setAmount] = useState(5000);
  const [months, setMonths] = useState(12);
  const [compound, setCompound] = useState(true);

  const projection = useMemo(() => {
    const years = months / 12;
    const simpleValue = amount * (1 + APY * years);
    const compoundedValue = amount * (1 + APY / 12) ** months;
    const finalValue = compound ? compoundedValue : simpleValue;
    return {
      finalValue,
      earnings: finalValue - amount,
      monthlyPoints: Array.from({ length: 12 }, (_, index) => {
        const step = index + 1;
        const effectiveMonths = Math.min(step * 2, months);
        const effectiveYears = effectiveMonths / 12;
        return compound
          ? amount * (1 + APY / 12) ** effectiveMonths
          : amount * (1 + APY * effectiveYears);
      }),
    };
  }, [amount, months, compound]);

  const maxPoint = Math.max(...projection.monthlyPoints);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
          What-if engine
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
          Staking Calculator
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
          Let users simulate staking outcomes before they commit capital.
          Adjust amount, duration, and compounding to show projected reward
          growth over time.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-6">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-white/65">
                <BadgeDollarSign className="h-4 w-4 text-[#d7ccff]" />
                <p className="text-sm">Amount to Stake</p>
              </div>
              <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-white">
                ${amount.toLocaleString()}
              </p>
              <input
                type="range"
                min={500}
                max={50000}
                step={250}
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                className="mt-5 w-full accent-[#bca7ff]"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 text-white/65">
                <ChartNoAxesCombined className="h-4 w-4 text-[#8effdd]" />
                <p className="text-sm">Duration</p>
              </div>
              <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-white">
                {months} months
              </p>
              <input
                type="range"
                min={1}
                max={24}
                step={1}
                value={months}
                onChange={(event) => setMonths(Number(event.target.value))}
                className="mt-5 w-full accent-[#8effdd]"
              />
            </div>

            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/70">
                  <Repeat2 className="h-4 w-4 text-[#ffcc85]" />
                  Compound interest
                </div>
                <button
                  type="button"
                  onClick={() => setCompound((value) => !value)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    compound
                      ? "bg-[#d7ccff] text-[#120f26]"
                      : "bg-white/10 text-white/65"
                  }`}
                >
                  {compound ? "Enabled" : "Disabled"}
                </button>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Toggle between simple yield and monthly compounding to show the
                true upside of staying staked longer.
              </p>
            </div>

            <button className="w-full rounded-2xl bg-[#d7ccff] px-5 py-4 text-sm font-medium text-[#120f26] transition hover:bg-[#c6b9ff]">
              Stake Now
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Summary title="Projected Value" value={`$${projection.finalValue.toFixed(2)}`} />
            <Summary title="Estimated Earnings" value={`$${projection.earnings.toFixed(2)}`} />
            <Summary title="Applied APY" value="12.72%" />
          </div>

          <div className="mt-6 rounded-[26px] border border-white/8 bg-[#111527] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Growth projection</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/35">
                  12 to 24 month horizon
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {compound ? "Compounded" : "Simple"}
              </span>
            </div>

            <div className="mt-8 flex h-64 items-end gap-3">
              {projection.monthlyPoints.map((point, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-3">
                  <div
                    className="w-full rounded-t-2xl bg-[linear-gradient(180deg,#d7ccff,#7f8cff)]"
                    style={{ height: `${Math.max((point / maxPoint) * 200, 24)}px` }}
                  />
                  <span className="text-[11px] text-white/40">{(index + 1) * 2}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Summary({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">{title}</p>
      <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
        {value}
      </p>
    </div>
  );
}
