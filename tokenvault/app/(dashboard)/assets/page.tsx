"use client";

import { ArrowDownLeft, ArrowUpRight, PieChart, WalletCards } from "lucide-react";

const PORTFOLIO = [
  { token: "ETH", name: "Ethereum", share: 60, liquid: "18.42", staked: "9.11", color: "#9da8ff" },
  { token: "AGT", name: "AgriToken", share: 30, liquid: "42,000", staked: "18,500", color: "#d7ccff" },
  { token: "MATIC", name: "Polygon", share: 10, liquid: "7,200", staked: "3,450", color: "#bb92ff" },
];

const TRANSACTIONS = [
  { type: "Deposit", token: "ETH", amount: "4.20", status: "Confirmed", date: "Apr 24, 2026" },
  { type: "Withdraw", token: "AGT", amount: "2,000", status: "Completed", date: "Apr 22, 2026" },
  { type: "Deposit", token: "MATIC", amount: "1,250", status: "Confirmed", date: "Apr 19, 2026" },
  { type: "Withdraw", token: "ETH", amount: "0.85", status: "Completed", date: "Apr 14, 2026" },
];

export default function AssetsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
          Asset inventory
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
          Assets
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
          A granular view of what sits in the wallet versus what is already
          locked in the vault. This page helps users manage inventory, balance
          liquidity, and review transaction history.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
              <PieChart className="h-5 w-5 text-[#d7ccff]" />
            </div>
            <div>
              <p className="text-lg font-medium text-white">Portfolio Breakdown</p>
              <p className="text-sm text-white/45">Wallet distribution by asset</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div
              className="h-56 w-56 rounded-full"
              style={{
                background:
                  "conic-gradient(#9da8ff 0% 60%, #d7ccff 60% 90%, #bb92ff 90% 100%)",
              }}
            >
              <div className="m-7 flex h-[168px] w-[168px] items-center justify-center rounded-full bg-[#0c1020]">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Total Allocation
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white">
                    100%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {PORTFOLIO.map((item) => (
              <div
                key={item.token}
                className="flex items-center justify-between rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.name} ({item.token})
                    </p>
                    <p className="text-xs text-white/45">{item.share}% of wallet</p>
                  </div>
                </div>
                <p className="text-sm text-white/75">{item.share}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <StatusCard title="Liquid Assets" value="$124,500" icon={<WalletCards className="h-4 w-4 text-[#8effdd]" />} />
            <StatusCard title="Staked Assets" value="$88,200" icon={<PieChart className="h-4 w-4 text-[#d7ccff]" />} />
          </div>

          <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-6">
            <div className="grid gap-4">
              {PORTFOLIO.map((item) => (
                <div
                  key={item.token}
                  className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-white">{item.token}</p>
                      <p className="text-sm text-white/45">{item.name}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                      {item.share}% share
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Detail label="Available / Liquid" value={item.liquid} />
                    <Detail label="Staked / Locked" value={item.staked} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-white">Transaction History</p>
            <p className="mt-1 text-sm text-white/45">
              Every deposit and withdrawal routed through the contract.
            </p>
          </div>
          <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition hover:bg-white/10">
            Export CSV
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-white/8">
          <div className="grid grid-cols-4 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/35">
            <span>Type</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Date</span>
          </div>
          {TRANSACTIONS.map((transaction) => (
            <div
              key={`${transaction.type}-${transaction.token}-${transaction.date}`}
              className="grid grid-cols-4 items-center border-t border-white/8 px-4 py-4 text-sm text-white/75"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5">
                  {transaction.type === "Deposit" ? (
                    <ArrowDownLeft className="h-4 w-4 text-[#8effdd]" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-[#ffb38f]" />
                  )}
                </span>
                <div>
                  <p className="font-medium text-white">{transaction.type}</p>
                  <p className="text-xs text-white/45">{transaction.token}</p>
                </div>
              </div>
              <span>{transaction.amount}</span>
              <span>{transaction.status}</span>
              <span>{transaction.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatusCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/55">{title}</p>
        {icon}
      </div>
      <p className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white">
        {value}
      </p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/8 bg-[#101425] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  );
}
