"use client";

import { useAccount } from "wagmi";
import {
  MessageSquare,
  Send,
  Terminal,
  Mail,
  ShieldQuestion,
  ShieldAlert,
  Globe,
  ExternalLink,
  Wallet,
  Hash,
  ChevronDown,
  Sparkles,
  HeadphonesIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/Card";

const SUPPORT_TIERS = [
  {
    title: "Community",
    platform: "Discord",
    icon: <MessageSquare size={20} />,
    desc: "Real-time troubleshooting and community validation.",
    color: "#5865F2",
    link: "https://discord.gg/tokenvault"
  },
  {
    title: "Direct Support",
    platform: "Telegram",
    icon: <Send size={20} />,
    desc: "Direct access to our core moderators and engineers.",
    color: "#229ED9",
    link: "https://t.me/0xEmmyb12"
  },
  {
    title: "Updates",
    platform: "X (Twitter)",
    icon: <Globe size={20} />,
    desc: "Real-time status updates and ICO announcements.",
    color: "#0f172a",
    link: "https://twitter.com/E12Emmy"
  },
  {
    title: "Developers",
    platform: "GitHub",
    icon: <Terminal size={20} />,
    desc: "Bug reporting and protocol improvement proposals.",
    color: "#334155",
    link: "https://github.com/0xEmmyb12/TokenVault"
  }
];

export default function ContactUsPage() {
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Support Ticket Submitted Successfully");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      
      {/* Header Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-medium">
          <HeadphonesIcon size={14} />
          24/7 Support Available
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Contact <span className="text-brand">&</span> Support
        </h1>
        <p className="text-foreground/60 max-w-2xl leading-relaxed">
          Need assistance with your vault? Our team and community are here to help you 
          navigate the TokenVault ecosystem safely.
        </p>
      </div>

      {/* Security Banner */}
      <div className="bg-amber-50 border border-amber-200 dark:bg-amber-500/5 dark:border-amber-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
          <ShieldAlert size={20} />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-amber-800 dark:text-amber-500">Security & Protocol Notice</h4>
            <span className="px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 text-[10px] font-bold uppercase">Beta</span>
          </div>
          <p className="text-sm text-amber-700/80 dark:text-foreground/60 leading-relaxed">
            <span className="font-bold underline decoration-amber-500/30">Never share your private keys or seed phrases.</span> TokenVault staff will never ask for them. 
            The protocol is in active development; expect minor instabilities during peak load.
          </p>
        </div>
      </div>

      {/* Support Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUPPORT_TIERS.map((tier) => (
          <a
            key={tier.platform}
            href={tier.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="h-full bg-card border-border hover:border-brand transition-colors duration-200 shadow-sm hover:shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-sm" style={{ background: tier.color }}>
                  {tier.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-brand uppercase tracking-wider">{tier.title}</p>
                  <h3 className="text-lg font-bold text-foreground">{tier.platform}</h3>
                </div>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  {tier.desc}
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* Ticket Terminal Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Support Terminal</h2>
            <p className="text-foreground/60 text-sm leading-relaxed">
              For specific transaction issues or technical inquiries, please submit a 
              formal ticket through our priority system.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Active Context</p>
            {isConnected ? (
              <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                <p className="text-xs font-medium text-brand/80">
                  Connected: <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-border flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-slate-400" />
                <p className="text-xs font-medium text-foreground/40">Wallet Disconnected</p>
              </div>
            )}
          </div>

          <div className="p-5 rounded-2xl border border-border bg-slate-50 dark:bg-slate-900/50 space-y-3">
            <ShieldQuestion className="text-brand/60" size={20} />
            <h4 className="font-bold text-foreground text-sm">Security Policy</h4>
            <p className="text-xs text-foreground/50 leading-relaxed">
              We provide support exclusively through official channels. Always verify 
              you are on the correct domain before entering any information.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Card className="bg-card border-border shadow-sm rounded-3xl">
            <CardContent className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/60 ml-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/60 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/60 ml-1 flex items-center gap-2">
                    <Wallet size={12} />
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    readOnly={isConnected}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="0x..."
                    className={`w-full border rounded-xl py-3 px-4 text-sm font-mono outline-none transition-all ${
                      isConnected 
                      ? 'bg-brand/5 border-brand/20 text-brand/70' 
                      : 'bg-slate-50 dark:bg-slate-900/50 border-border text-foreground focus:ring-2 focus:ring-brand/20 focus:border-brand'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/60 ml-1">Inquiry Type</label>
                  <div className="relative">
                    <select
                      required
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected className="bg-card text-foreground/50">Select category</option>
                      <option value="liquidity" className="bg-card text-foreground">Liquidity Issues</option>
                      <option value="buy" className="bg-card text-foreground">Token Purchase</option>
                      <option value="transfer" className="bg-card text-foreground">Transfers & Staking</option>
                      <option value="wallet" className="bg-card text-foreground">Wallet Connectivity</option>
                      <option value="other" className="bg-card text-foreground">Other General</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" size={14} />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-foreground/60 ml-1 flex items-center gap-2">
                    <Hash size={12} />
                    Transaction Hash (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Paste transaction hash if applicable"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl py-3 px-4 text-sm font-mono text-foreground focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-foreground/60 ml-1">Message Detail</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please describe your request..."
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-brand text-white font-bold text-sm py-4 rounded-xl shadow-sm hover:shadow-md hover:bg-brand/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Support Ticket
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
