"use client";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { config } from "../provider/wagmiConfig";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Web3Provider from "../context/Web3Provider";
import { ToastProvider } from "../context/ToastContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#8c7cff",
            accentColorForeground: "#0b0d16",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ToastProvider>
            <Web3Provider>
              {children}
            </Web3Provider>
          </ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
