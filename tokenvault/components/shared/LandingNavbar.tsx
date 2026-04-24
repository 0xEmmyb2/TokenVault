"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";
import { useRedirectOnConnect } from "@/hooks/useRedirectOnConnect";
import { WalletConnectCTA } from "@/components/shared/WalletConnectCTA";

export const LandingNavbar = () => {
  useRedirectOnConnect();

  return (
    <nav className="sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 rounded-full border border-white/10 bg-[#0b0d16]/75 px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#c9b6ff,#6f7dff)] text-[#080912] shadow-[0_0_30px_rgba(138,115,255,0.35)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">
              TokenVault
            </p>
            <p className="text-sm text-white/85">ERC20 Yield Infrastructure</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-white/60 lg:flex">
          <a href="#overview" className="transition hover:text-white">
            Overview
          </a>
          <a href="#markets" className="transition hover:text-white">
            Markets
          </a>
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#security" className="transition hover:text-white">
            Security
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 md:flex">
            <Sparkles className="h-3.5 w-3.5 text-[#c9b6ff]" />
            Multi-asset staking cockpit
          </div>
          <WalletConnectCTA className="px-4 py-3" />
        </div>
      </div>
    </nav>
  );
};
