"use client";

import React from "react";
import { ArrowUpRight, Wallet } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative w-full py-10 px-6 bg-[#0B0B0F] border border-white/5 rounded-3xl overflow-hidden mb-8">
      {/* Background Glow Effect */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Manage your <span className="text-purple-500">ERC20 Assets</span>{" "}
            <br />
            with TokenVault.
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Securely deposit, stake, and track your tokens with real-time
            rewards and analytics.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
              Get Started <ArrowUpRight size={18} />
            </button>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all flex items-center gap-2">
              Documentation
            </button>
          </div>
        </div>

        {/* Stats Mini-Card */}
        <div className="w-full md:w-72 p-6 bg-[#121218] border border-white/5 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Wallet className="text-purple-500" size={20} />
            </div>
            <span className="text-gray-400 text-sm">Total Value Locked</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">$1,240,500</div>
          <div className="text-green-400 text-xs font-medium">
            +12.5% from last month
          </div>
        </div>
      </div>
    </section>
  );
};
