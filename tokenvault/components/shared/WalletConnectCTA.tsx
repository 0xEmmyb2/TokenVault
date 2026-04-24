"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

type WalletConnectCTAProps = {
  className?: string;
  label?: string;
};

export const WalletConnectCTA = ({
  className,
  label = "Connect Wallet",
}: WalletConnectCTAProps) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openConnectModal }) => {
        const ready = mounted;
        const connected = ready && !!account && !!chain;

        if (!ready || connected) {
          return null;
        }

        return (
          <button
            type="button"
            onClick={openConnectModal}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-2xl border border-[#c7b6ff]/35 bg-[linear-gradient(135deg,rgba(205,189,255,0.22),rgba(119,130,255,0.28))] px-5 py-3.5 text-sm font-medium text-white shadow-[0_12px_40px_rgba(95,92,211,0.24)] transition hover:border-[#ddd2ff]/45 hover:bg-[linear-gradient(135deg,rgba(205,189,255,0.28),rgba(119,130,255,0.36))]",
              className,
            )}
          >
            <Wallet className="h-4 w-4" />
            {label}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
};
