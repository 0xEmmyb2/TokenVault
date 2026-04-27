"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import {
  ArrowRightLeft,
  FileText,
  History,
  LayoutDashboard,
  Mail,
  Send,
  Settings,
  ShieldAlert,
  Wallet,
  Menu,
} from "lucide-react";
import { SidebarAccount } from "@/features/dashboard/components/SidebarAccount";
import { WalletStatus } from "@/components/web3/WalletStatus";
import { useRedirectOnDisconnect } from "@/hooks/useRedirectOnDisconnect";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useVault } from "@/features/dashboard/hooks/useVault";
import { GlobalTicker } from "@/components/shared/GlobalTicker";
import { Logo } from "@/components/shared/Logo";

const PRIMARY_NAV = [
  { href: "/dashboard", label: "User Dashboard", icon: LayoutDashboard },
  { href: "/purchase-history", label: "Purchase History", icon: History },
  { href: "/transactions", label: "Transaction", icon: ArrowRightLeft },
  { href: "/transfer", label: "Token Transfer", icon: Send },
  { href: "/documentation", label: "Token Documentation", icon: FileText },
  { href: "/contact-us", label: "Contact Us", icon: Mail },
];

const ADMIN_NAV = [
  { href: "/withdraw", label: "Withdraw Tokens", icon: Wallet },
  { href: "/admin-functions", label: "Admin Functions", icon: Settings },
  { href: "/admin", label: "Admin", icon: ShieldAlert },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();
  const { isAdmin } = useVault();
  useRedirectOnDisconnect();

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="hidden w-[280px] shrink-0 border-r border-border bg-card xl:flex xl:flex-col shadow-sm">
        <div className="flex flex-col h-full p-6">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 shrink-0">
            <Logo size={40} className="h-10 w-10 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border p-1.5" />
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 leading-none">
                TokenVault
              </p>
              <p className="text-base font-bold tracking-tight text-foreground leading-none">
                Vault OS
              </p>
            </div>
          </div>

          {/* Staking Mode Indicator - Simplified */}
          <div className="mt-8 px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-border flex items-center justify-between">
            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Protocol</span>
            <span className="text-[10px] font-bold text-brand uppercase">Active</span>
          </div>

          {/* Nav Area */}
          <nav className="mt-8 flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
            {PRIMARY_NAV.map((item) => (
              <NavItem
                key={item.label}
                href={item.href}
                icon={<item.icon className="h-4.5 w-4.5" />}
                label={item.label}
              />
            ))}

            {isAdmin && (
              <div className="mt-10 pt-6 space-y-1 border-t border-border">
                <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-bold mb-4">
                  Administrator
                </p>
                {ADMIN_NAV.map((item) => (
                  <NavItem
                    key={item.label}
                    href={item.href}
                    icon={<item.icon className="h-4.5 w-4.5" />}
                    label={item.label}
                  />
                ))}
              </div>
            )}
          </nav>

          {/* Bottom Account */}
          <div className="mt-auto pt-6 border-t border-border">
            <SidebarAccount />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <GlobalTicker />
        
        {/* Header */}
        <header className="relative z-10 flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Toggle - Simplified */}
             <button className="xl:hidden p-2 rounded-lg bg-foreground/5">
                <Menu size={20} />
             </button>
             <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-bold text-foreground/50 uppercase tracking-wider">
               <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
               Network Stable
             </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isConnected && <WalletStatus variant="compact" />}
          </div>
        </header>

        <main className="relative flex-1 overflow-y-auto bg-slate-50/50 dark:bg-background/50">
          <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const active = href ? pathname === href : false;
  
  return (
    <Link
      href={href || "#"}
      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 group
        ${active
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-md"
          : "text-foreground/50 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-foreground"
        }
      `}
    >
      <span className={active ? "" : "text-foreground/30 group-hover:text-foreground"}>
        {icon}
      </span>
      <span>{label}</span>
      {active && (
        <div className="ml-auto h-1 w-1 rounded-full bg-current opacity-50" />
      )}
    </Link>
  );
}
