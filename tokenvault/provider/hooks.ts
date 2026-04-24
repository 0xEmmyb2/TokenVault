"use client";
import { ethers } from "ethers";
import { useMemo } from "react";
import { useClient, useConnectorClient } from "wagmi";
import type { Client, Chain, Transport } from "viem";

// ─── Provider adapter ────────────────────────────────────────────────────────

export function clientToProvider(
  client: Client<Transport, Chain>,
): ethers.JsonRpcProvider | ethers.FallbackProvider {
  const { chain, transport } = client;

  const network: ethers.Networkish = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  if (transport.type === "fallback") {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new ethers.JsonRpcProvider(value?.url as string, network),
    );
    // FallbackProvider is correct spelling (not FallBackProvider)
    return new ethers.FallbackProvider(providers);
  }

  return new ethers.JsonRpcProvider(transport.url as string, network);
}

export function useEthersProvider({ chainId }: { chainId?: number } = {}):
  | ethers.JsonRpcProvider
  | ethers.FallbackProvider
  | undefined {
  const client = useClient({ chainId });

  return useMemo(
    () =>
      client ? clientToProvider(client as Client<Transport, Chain>) : undefined,
    [client],
  );
}

// ─── Signer adapter ──────────────────────────────────────────────────────────

export function clientToSigner(
  client: Client<Transport, Chain>,
): ethers.JsonRpcSigner {
  const { account, chain, transport } = client;

  const network: ethers.Networkish = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };


  // ethers.BrowserProvider wraps an EIP-1193 transport (not ethers.provider.Web3Provider)
  const provider = new ethers.BrowserProvider(transport, network);

  // getSigner is async in ethers v6 — call .then() or await at the call site
  return provider.getSigner(
    account?.address,
  ) as unknown as ethers.JsonRpcSigner;
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}):
  | ethers.JsonRpcSigner
  | undefined {
  const { data: client } = useConnectorClient({ chainId });

  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}
