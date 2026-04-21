/**
 * Web3 Icons Integration - Optimized for Agri-dApp (2026)
 * Includes:
 * 1. @web3icons/react for branded assets
 * 2. @rainbow-me/rainbowkit for wallet and chain connectors
 * 3. Custom SVG icons for UI state and app-specific actions
 */

import React from "react";

// ============================================================================
// RAINBOWKIT HELPERS
// ============================================================================

export const RainbowKitChainIcons = () => {
  try {
    return require("@rainbow-me/rainbowkit").chainToLogoUrl;
  } catch {
    return null;
  }
};

export const RainbowKitChain = ({ chain, size = 32 }) => {
  try {
    const { getChainIconUrl } = require("@rainbow-me/rainbowkit");
    const iconUrl = getChainIconUrl?.(chain);

    return iconUrl ? (
      <img
        src={iconUrl}
        alt={chain?.name || "Chain"}
        width={size}
        height={size}
        style={{ borderRadius: "4px" }}
      />
    ) : (
      <DefaultNetworkIcon name={chain?.name} size={size} />
    );
  } catch {
    return <DefaultNetworkIcon name={chain?.name} size={size} />;
  }
};

export const RainbowKitWallet = ({ wallet, size = 32 }) => {
  try {
    return wallet?.icon ? (
      <img
        src={wallet.icon}
        alt={wallet?.name || "Wallet"}
        width={size}
        height={size}
        style={{ borderRadius: "8px" }}
      />
    ) : (
      <DefaultWalletIcon name={wallet?.name} size={size} />
    );
  } catch {
    return <DefaultWalletIcon name={wallet?.name} size={size} />;
  }
};

// ============================================================================
// WEB3ICONS BRANDED COMPONENTS
// ============================================================================

const createWeb3Icon = (iconName, fallbackType) => (props) => {
  try {
    const lib = require("@web3icons/react");
    const Icon = lib[iconName];

    if (!Icon) {
      throw new Error(`Missing icon: ${iconName}`);
    }

    return <Icon variant="branded" {...props} />;
  } catch {
    if (fallbackType === "token") {
      return <DefaultTokenIcon name={iconName.replace("Token", "")} {...props} />;
    }

    if (fallbackType === "network") {
      return (
        <DefaultNetworkIcon name={iconName.replace("Network", "")} {...props} />
      );
    }

    if (fallbackType === "exchange") {
      return (
        <DefaultExchangeIcon name={iconName.replace("Exchange", "")} {...props} />
      );
    }

    return <DefaultWalletIcon name={iconName.replace("Wallet", "")} {...props} />;
  }
};

export const TokenBTC = createWeb3Icon("TokenBTC", "token");
export const TokenETH = createWeb3Icon("TokenETH", "token");
export const TokenUSDC = createWeb3Icon("TokenUSDC", "token");
export const TokenUSDT = createWeb3Icon("TokenUSDT", "token");
export const TokenBNB = createWeb3Icon("TokenBNB", "token");
export const TokenSOL = createWeb3Icon("TokenSOL", "token");
export const TokenXRP = createWeb3Icon("TokenXRP", "token");

export const NetworkEthereum = createWeb3Icon("NetworkEthereum", "network");
export const NetworkPolygon = createWeb3Icon("NetworkPolygon", "network");
export const NetworkBSC = createWeb3Icon("NetworkBinanceSmartChain", "network");
export const NetworkArbitrum = createWeb3Icon("NetworkArbitrumOne", "network");
export const NetworkOptimism = createWeb3Icon("NetworkOptimism", "network");
export const NetworkBase = createWeb3Icon("NetworkBase", "network");

export const WalletMetamask = createWeb3Icon("WalletMetamask", "wallet");
export const WalletCoinbase = createWeb3Icon("WalletCoinbase", "wallet");
export const WalletRainbow = createWeb3Icon("WalletRainbow", "wallet");
export const WalletLedger = createWeb3Icon("WalletLedger", "wallet");
export const WalletWalletConnect = createWeb3Icon(
  "WalletWalletConnect",
  "wallet",
);

export const ExchangeUniswap = createWeb3Icon("ExchangeUniswap", "exchange");
export const ExchangeBinance = createWeb3Icon("ExchangeBinance", "exchange");
export const ExchangePancakeswap = createWeb3Icon(
  "ExchangePancakeswap",
  "exchange",
);

// ============================================================================
// CUSTOM SVG ICONS
// ============================================================================

export const WalletIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="6"
      width="20"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M2 10h20" stroke={color} strokeWidth="2" />
    <circle cx="17" cy="15" r="1.5" fill={color} />
  </svg>
);

export const BlockchainIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="8"
      height="8"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <rect
      x="14"
      y="2"
      width="8"
      height="8"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <rect
      x="2"
      y="13"
      width="8"
      height="8"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <rect
      x="13"
      y="13"
      width="8"
      height="8"
      rx="1"
      stroke={color}
      strokeWidth="2"
    />
    <line x1="6" y1="10" x2="6" y2="13" stroke={color} strokeWidth="2" />
    <line x1="17" y1="10" x2="17" y2="13" stroke={color} strokeWidth="2" />
    <line x1="10" y1="17" x2="13" y2="17" stroke={color} strokeWidth="2" />
  </svg>
);

export const LoadingSpinner = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .spinner { animation: spin 1s linear infinite; transform-origin: center; }
    `}</style>
    <g className="spinner">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        opacity="0.2"
      />
      <path
        d="M12 2a10 10 0 0110 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  </svg>
);

export const SuccessCheckmark = ({ size = 24, color = "#10b981" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path
      d="M8 12l2 2 4-4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ErrorXMark = ({ size = 24, color = "#ef4444" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path
      d="M8 8l8 8M16 8l-8 8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CopyIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="9"
      y="9"
      width="13"
      height="13"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);

// ============================================================================
// FALLBACKS AND UTILITIES
// ============================================================================

const fallbackStyle = (size, extra = {}) => ({
  width: size,
  height: size,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: size > 24 ? "12px" : "10px",
  fontWeight: "bold",
  textTransform: "uppercase",
  ...extra,
});

const DefaultTokenIcon = ({ name = "T", size = 24 }) => (
  <div style={fallbackStyle(size)} title={name}>
    {name.substring(0, 1)}
  </div>
);

const DefaultNetworkIcon = ({ name = "N", size = 24 }) => (
  <div style={fallbackStyle(size)} title={name}>
    N
  </div>
);

const DefaultWalletIcon = ({ name = "W", size = 24 }) => (
  <div style={fallbackStyle(size, { borderRadius: "8px" })} title={name}>
    W
  </div>
);

const DefaultExchangeIcon = ({ name = "X", size = 24 }) => (
  <div style={fallbackStyle(size, { borderRadius: "8px" })} title={name}>
    X
  </div>
);

export const getTokenIcon = (tokenSymbol, props = {}) => {
  const icons = {
    BTC: TokenBTC,
    ETH: TokenETH,
    USDC: TokenUSDC,
    USDT: TokenUSDT,
    BNB: TokenBNB,
    SOL: TokenSOL,
    XRP: TokenXRP,
  };

  const Icon = icons[tokenSymbol?.toUpperCase()] || DefaultTokenIcon;
  return <Icon {...props} />;
};

export default {
  TokenBTC,
  TokenETH,
  TokenUSDC,
  TokenUSDT,
  TokenBNB,
  TokenSOL,
  TokenXRP,
  NetworkEthereum,
  NetworkPolygon,
  NetworkBSC,
  NetworkArbitrum,
  NetworkOptimism,
  NetworkBase,
  WalletMetamask,
  WalletCoinbase,
  WalletRainbow,
  WalletLedger,
  WalletWalletConnect,
  ExchangeUniswap,
  ExchangeBinance,
  ExchangePancakeswap,
  WalletIcon,
  BlockchainIcon,
  LoadingSpinner,
  SuccessCheckmark,
  ErrorXMark,
  CopyIcon,
  getTokenIcon,
  RainbowKitChainIcons,
  RainbowKitChain,
  RainbowKitWallet,
};
