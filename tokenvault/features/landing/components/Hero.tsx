"use client";

import {
  ArrowUpRight,
  CandlestickChart,
  Shield,
  WalletCards,
} from "lucide-react";
import { WalletConnectCTA } from "@/components/shared/WalletConnectCTA";

export const Hero = () => {
  return (
    <section
      id="overview"
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(130,123,255,0.24),transparent_32%),linear-gradient(180deg,rgba(12,15,27,0.96),rgba(8,10,18,0.98))] px-6 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] md:px-8 md:py-10"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px] opacity-20" />
      <div className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-[#917cff]/20 blur-[110px]" />
      <div className="absolute bottom-0 left-12 h-44 w-44 rounded-full bg-[#63ffd5]/10 blur-[90px]" />

      <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b49cff]/20 bg-[#b49cff]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#ddd2ff]">
              Liquid ERC20 Vault Layer
            </div>

            <div className="max-w-3xl space-y-5">
              <h1 className="max-w-2xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl xl:text-7xl">
                Handle, stake, and monitor ERC20 assets from one command
                center.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/68 md:text-lg">
                TokenVault gives your project a premium on-chain front door:
                wallet connection, asset routing, yield discovery, and
                portfolio intelligence designed for modern token operations.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <WalletConnectCTA />
              <a
                href="#markets"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Explore vault markets
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
              <WalletCards className="mb-4 h-5 w-5 text-[#c4b1ff]" />
              <p className="text-sm font-medium text-white">Wallet-native UX</p>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Connect, deposit, and track token positions without leaving the
                app.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
              <CandlestickChart className="mb-4 h-5 w-5 text-[#81ffe0]" />
              <p className="text-sm font-medium text-white">Live APR signals</p>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Surface reward trends, liquidity movement, and performance
                confidence.
              </p>
            </div>
            <div
              id="security"
              className="rounded-[28px] border border-white/10 bg-black/20 p-5"
            >
              <Shield className="mb-4 h-5 w-5 text-[#ffcc85]" />
              <p className="text-sm font-medium text-white">Secure by design</p>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Built for audited contracts, controlled access, and transparent
                ERC20 handling.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(19,22,39,0.96),rgba(26,18,47,0.9))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="rounded-[28px] border border-white/10 bg-[#0b0f1e]/80 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Portfolio command card
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                  Liquid Staking Portfolio
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/58">
                  A focused control surface for project treasury assets,
                  delegated staking, and wallet-driven investment flows.
                </p>
              </div>

              <div className="rounded-full border border-[#c6b4ff]/30 bg-[#ad95ff]/12 px-3 py-1 text-xs text-[#e6dcff]">
                Live
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">Wallet coverage</span>
                  <span className="font-medium text-white">
                    12 connected vaults
                  </span>
                </div>
                <div className="mt-4 h-28 overflow-hidden rounded-[18px] border border-white/6 bg-[radial-gradient(circle_at_75%_25%,rgba(164,140,255,0.2),transparent_38%),#090b13] p-3">
                  <svg viewBox="0 0 320 110" className="h-full w-full">
                    <defs>
                      <linearGradient
                        id="hero-line"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#7f8cff" />
                        <stop offset="60%" stopColor="#cab7ff" />
                        <stop offset="100%" stopColor="#76ffe2" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 92 C35 89, 44 48, 77 56 S130 94, 158 72 S211 30, 246 48 S282 88, 320 18"
                      fill="none"
                      stroke="url(#hero-line)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 92 C35 89, 44 48, 77 56 S130 94, 158 72 S211 30, 246 48 S282 88, 320 18 L320 110 L0 110 Z"
                      fill="url(#hero-line)"
                      opacity="0.08"
                    />
                    <circle cx="246" cy="48" r="5" fill="#cab7ff" />
                    <circle cx="320" cy="18" r="5" fill="#76ffe2" />
                  </svg>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/38">
                    Total value routed
                  </p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                    $8.42M
                  </p>
                  <p className="mt-2 text-sm text-[#81ffe0]">
                    +18.4% monthly treasury flow
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/38">
                    Average active APR
                  </p>
                  <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                    12.72%
                  </p>
                  <p className="mt-2 text-sm text-[#ddd2ff]">
                    Adaptive allocation across ETH, BNB, and MATIC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
