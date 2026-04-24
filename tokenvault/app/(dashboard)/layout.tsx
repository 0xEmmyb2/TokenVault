"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  Database,
  LayoutDashboard,
  Network,
  PanelsTopLeft,
  ShieldCheck,
  Bell,
  Wallet,
} from "lucide-react";
import { SidebarAccount } from "@/features/dashboard/components/SidebarAccount";

const PRIMARY_NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assets", label: "Assets", icon: Wallet },
  { href: "/providers", label: "Staking Providers", icon: Network },
  { href: "/calculator", label: "Staking Calculator", icon: PanelsTopLeft },
  { href: "/data-api", label: "Data API", icon: ArrowUpRight },
  {
    href: "/liquid-staking",
    label: "Liquid Staking",
    icon: Database,
    badge: "Beta",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();

  return (
    <div className="flex h-screen overflow-hidden bg-[#070911] text-white">
      <aside className="hidden w-[292px] shrink-0 border-r border-white/6 bg-[#090b14] p-5 xl:flex xl:flex-col">
        <div className="flex items-center gap-3 rounded-[26px] border border-white/8 bg-[#0f1220] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#ffffff,#b09cff)] text-[#0a0d18] shadow-[0_0_30px_rgba(176,156,255,0.32)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/40">
              TokenVault
            </p>
            <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">
              Staking workspace
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-[22px] border border-white/8 bg-[#0c0f1b] p-1.5">
          <button className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgba(255,255,255,0.06)]">
            Staking
          </button>
          <button className="rounded-2xl px-4 py-3 text-sm text-white/38 transition hover:text-white/75">
            Stablecoin
          </button>
        </div>

        <nav className="mt-5 flex-1 space-y-1">
          {PRIMARY_NAV.map((item) => (
            <NavItem
              key={item.label}
              href={item.href}
              icon={<item.icon className="h-4.5 w-4.5" />}
              label={item.label}
              badge={item.badge}
            />
          ))}
        </nav>

        <SidebarAccount />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="relative z-10 flex h-20 items-center justify-between border-b border-white/6 bg-[#070911]/70 px-5 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3 xl:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#ffffff,#b09cff)] text-[#0a0d18]">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/38">
                TokenVault
              </p>
              <p className="text-sm font-medium text-white">Dashboard</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-sm text-white/65 md:flex">
            <Activity className="h-4 w-4 text-[#8effdd]" />
            Portfolio live
          </div>

          <div className="flex items-center gap-3">
            <button className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#bca7ff]" />
            </button>

            <div className="hidden items-center gap-3 rounded-full border border-white/8 bg-white/5 px-4 py-2.5 lg:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(145deg,#bca8ff,#7f8cff)] text-xs font-semibold text-[#090b14]">
                TV
              </div>
              <div className="text-left">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                  Workspace
                </p>
                <p className="text-sm font-medium text-white">Treasury Vault</p>
              </div>
              <ChevronDown className="h-4 w-4 text-white/40" />
            </div>

            {!isConnected ? null : (
              <div className="rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm text-white/70">
                Wallet Connected
              </div>
            )}
          </div>
        </header>

        <main className="relative flex-1 overflow-y-auto p-5 md:p-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-10%] top-[-10%] h-[340px] w-[340px] rounded-full bg-[#7d73ff]/10 blur-[120px]" />
            <div className="absolute right-0 top-[15%] h-[280px] w-[280px] rounded-full bg-[#8effdd]/6 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-[1320px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

/**
 * NAV ITEM HELPER COMPONENT
 * Handles routing logic and active styling
 */
function NavItem({
  href,
  icon,
  label,
  badge,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  const pathname = usePathname();
  const active = href ? pathname === href : false;
  const classes =
    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all duration-300";

  const content = (
    <>
      <span
        className={
          active
            ? "text-white"
            : "text-white/45 transition group-hover:text-white"
        }
      >
        {icon}
      </span>
      <span className={active ? "font-medium text-white" : "text-white/58"}>
        {label}
      </span>
      {badge ? (
        <span className="ml-auto rounded-full border border-[#b8a7ff]/20 bg-[#aa95ff]/10 px-2 py-0.5 text-[10px] text-[#ddd2ff]">
          {badge}
        </span>
      ) : null}
      {active ? (
        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#d7ccff] shadow-[0_0_12px_rgba(215,204,255,0.9)]" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} group ${
          active
            ? "border border-white/8 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            : "hover:bg-white/[0.04]"
        }`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${classes} group w-full text-left hover:bg-white/[0.04]`}
    >
      {content}
    </button>
  );
}
