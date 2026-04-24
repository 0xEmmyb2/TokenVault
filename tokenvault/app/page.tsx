"use client";

import { useEffect } from "react";
import { LandingNavbar } from "@/components/shared/LandingNavbar";
import { FeatureGrid } from "@/features/landing/components/FeatureGrid";
import { Hero } from "@/features/landing/components/Hero";
import { PortfolioPreview } from "@/features/landing/components/PortfolioPreview";
import { StatsBar } from "@/features/landing/components/StatsBar";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-[#060816] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#766dff]/20 blur-[160px]" />
        <div className="absolute left-0 top-40 h-[360px] w-[360px] rounded-full bg-[#4ecdc4]/8 blur-[140px]" />
        <div className="absolute right-0 top-80 h-[360px] w-[360px] rounded-full bg-[#ff8bc2]/8 blur-[140px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
          <LandingNavbar />
          <Hero />
          <StatsBar />
          <PortfolioPreview />
          <FeatureGrid />
        </div>
      </div>
    </main>
  );
}
