import { ethers } from "ethers";
import { useMemo } from "react";
import { useClient, useConnectorClient } from "wagmi";

export function clientToProvider(client) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  if (transport.type === "fallback") {
    return new ethers.providers.FallBackProvider(
      transport.transports.map(
        ({ value }) => new ethers.JsonRpcProvider(value?.url, network),
      ),
    );
  }
  return new ethers.JsonRpcProvider(transport.url, network);
}

export function useEthersProviders({ chainId } = {}) {
  const client = useClient({ chainId });

  return useMemo(
    () => (client ? clientToProvider(client) : undefined),
    [client],
  );
}

export function clientToSigner(client) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  const provider = new ethers.provider.Web3Provider(transport, network);
  const signer = ethers.provider.getSigner(account.address);
  return signer;
}

export function useEthersSigner({ chainId } = {}) {
  const { data: client } = useConnectorClient({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}
