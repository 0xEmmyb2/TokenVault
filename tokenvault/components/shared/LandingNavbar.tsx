"use client";

import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { useRedirectOnConnect } from "@/hooks/useRedirectOnConnect";
import { WalletConnectCTA } from "@/components/shared/WalletConnectCTA";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Markets", href: "#markets" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
];

export const LandingNavbar = () => {
  useRedirectOnConnect();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"
          }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-500 md:px-6 ${scrolled
              ? "rounded-2xl border border-border bg-background/85 shadow-lg backdrop-blur-2xl"
              : "rounded-[32px] border border-border bg-background/40 backdrop-blur-md"
            } py-3`}
        >
          <Link href="/" className="flex items-center gap-3">
            <Logo size={44} className="h-11 w-11 bg-background rounded-2xl border border-border shadow-sm p-2" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-foreground/50">
                TokenVault
              </p>
              <p className="text-sm font-medium text-foreground/90">
                ERC20 Yield Infrastructure
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-xl px-4 py-2 text-sm text-foreground/55 transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-border bg-foreground/5 px-3 py-2 text-xs text-foreground/65 md:flex">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Multi-asset cockpit
            </div>
            <ThemeToggle />
            <WalletConnectCTA className="px-4 py-2.5 text-sm" />
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-foreground/5 text-foreground/70 transition hover:bg-foreground/10 lg:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-border bg-background/95 px-4 py-4 shadow-xl backdrop-blur-2xl lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-foreground/65 transition hover:bg-foreground/8 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-border pt-4 px-4">
                <span className="text-sm text-foreground/60">Appearance</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
