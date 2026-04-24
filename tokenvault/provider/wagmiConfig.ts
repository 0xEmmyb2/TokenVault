"use client";
import { baseSepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_WALLET_CONECT_PROJECT_ID in .env file");
}

export const config = getDefaultConfig({
  appName: "TokenVault",
  projectId: projectId,
  chains: [baseSepolia],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
});
