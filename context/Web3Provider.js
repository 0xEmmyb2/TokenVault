import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useChainId, useConnect, useBalance } from "wagmi";

import { useToast } from "./ToastContext";
import TOKEN_ICO_ABI from "./ABI.json";
import { useEthersProviders, useEthersSigner } from "../provider/hooks";
import { config } from "../provider/wagmiConfig";
import { handleTransactionError, ERC20_ABI } from "./Utility";

const AGRITOKEN_ADDRESS = process.env.NEXT_PUBLIC_AGRITOKEN_ADDRESS;
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
const TOKEN_DECIMAL = process.env.NEXT_PUBLIC_TOKEN_DECIMAL;
const TOKEN_LOGO = process.env.NEXT_PUBLIC_TOKEN_LOGO;
const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE;

const TokenICOABI = TOKEN_ICO_ABI.abi;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ICO_ADDRESS;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

// ── Single fallback provider at module level ───────────────────────────────
const fallbackProvider = new ethers.JsonRpcProvider(RPC_URL);

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  // BUG FIX 3: useToast must be called as a hook
  const { notify } = useToast();

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { balance } = useBalance({ config });
  const { connect, connectors } = useConnect();

  // BUG FIX 1: correct hook name (was useEthersProvider, no 's')
  const provider = useEthersProviders();
  const signer = useEthersSigner();

  const [reCall, setReCall] = useState(0);
  const [globalLoad, setGlobalLoad] = useState(false);
  const [contract, setContract] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  // BUG FIX 5: error state was used but never declared
  const [error, setError] = useState(null);

  const [contractInfo, setContractInfo] = useState({
    tbcAddress: null,
    tbcBalance: "0",
    ethPrice: "0",
    totalSold: "0",
  });

  const [tokenBalance, setTokenBalance] = useState({
    userTbcBalance: "0",
    contractEthBalance: null,
    totalSupply: null,
    userEthBalance: null,
    ethPrice: "0",
    tbcBalance: "0",
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // ── Init contract ──────────────────────────────────────────────────────
  useEffect(() => {
    const initContract = () => {
      if (!CONTRACT_ADDRESS) return;
      if (provider && signer) {
        try {
          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            TokenICOABI,
            signer,
          );
          setContract(contractInstance);
        } catch (err) {
          console.error("Error initializing contract:", err);
          setError("Failed to initialize the contract");
        }
      }
    };
    initContract();
  }, [provider, signer]);

  // ── Fetch contract info ────────────────────────────────────────────────
  useEffect(() => {
    const fetchContractInfo = async () => {
      if (!CONTRACT_ADDRESS) {
        console.warn("CONTRACT_ADDRESS not set in .env");
        return;
      }
      setGlobalLoad(true);
      try {
        const currentProvider = provider || fallbackProvider;

        const readOnlyContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          TokenICOABI,
          currentProvider,
        );

        const info = await readOnlyContract.getContractInfo();
        const tokenDecimals = parseInt(info.tokenDecimals) || 18;

        setContractInfo({
          tbcAddress: info.tokenAddress,
          tbcBalance: ethers.formatUnits(info.tokenBalance, tokenDecimals),
          ethPrice: ethers.formatUnits(info.ethPrice, 18),
          totalSold: ethers.formatUnits(info.totalSold, tokenDecimals),
        });

        if (address) {
          const owner = await readOnlyContract.i_owner();
          setIsAdmin(owner.toLowerCase() === address.toLowerCase());
        } else {
          setIsAdmin(false);
        }

        if (address && info.tokenAddress) {
          const tokenContract = new ethers.Contract(
            info.tokenAddress,
            ERC20_ABI,
            currentProvider,
          );

          const [
            userTokenBalance,
            userEthBalance,
            contractEthBalance,
            totalSupply,
          ] = await Promise.all([
            tokenContract.balanceOf(address),
            currentProvider.getBalance(address),
            currentProvider.getBalance(CONTRACT_ADDRESS),
            tokenContract.totalSupply(),
          ]);

          // BUG FIX 4: prev must be passed as a function parameter
          setTokenBalance((prev) => ({
            ...prev,
            userTbcBalance: ethers.formatUnits(userTokenBalance, tokenDecimals),
            contractEthBalance: ethers.formatUnits(contractEthBalance),
            totalSupply: ethers.formatUnits(totalSupply, tokenDecimals),
            userEthBalance: ethers.formatUnits(userEthBalance),
            ethPrice: ethers.formatUnits(info.ethPrice, 18),
            tbcBalance: ethers.formatUnits(info.tokenBalance, tokenDecimals),
          }));
        }
      } catch (err) {
        console.error("Error fetching contract info:", err);
        setError("Failed to fetch contract info");
      } finally {
        setGlobalLoad(false);
      }
    };

    fetchContractInfo();
  }, [contract, address, provider, signer, reCall]);

  // ── Actions ────────────────────────────────────────────────────────────

  const buyToken = async (ethAmount) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Buying ${TOKEN_SYMBOL} with ${CURRENCY}...`);

    try {
      const ethValue = ethers.parseEther(ethAmount);
      const tx = await contract.buyToken({ value: ethValue });

      notify.update(toastId, "Processing", "Waiting for confirmation");

      // BUG FIX 6: was missing await
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        const tokenPrice = PER_TOKEN_USD_PRICE;
        const tokensReceived = parseFloat(ethAmount) / tokenPrice;

        saveTransactionToLocalStorage({
          timestamp: Date.now(),
          user: address,
          tokenIn: CURRENCY,
          tokenOut: TOKEN_SYMBOL,
          amountIn: ethAmount,
          amountOut: tokensReceived.toString(),
          transactionType: "BUY",
          hash: receipt.hash,
        });

        setReCall((prev) => prev + 1);
        notify.complete(
          toastId,
          `Successfully purchased ${TOKEN_SYMBOL} tokens`,
        );
        return receipt;
      }
    } catch (err) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        err,
        "buying tokens",
      );
      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }
      console.error(errorMessage);
      notify.fail(toastId, "Transaction failed, Please try again!");
      return null;
    }
  };

  const saveTransactionToLocalStorage = (txData) => {
    try {
      const existing =
        JSON.parse(localStorage.getItem("tokenTransactions")) || [];
      existing.push(txData);
      localStorage.setItem("tokenTransactions", JSON.stringify(existing));
    } catch (err) {
      console.error("Failed to save transaction to localStorage", err);
    }
  };

  const updateTokenPrice = async (newPrice) => {
    if (!contract || !address) return null;

    const toastId = notify.start("Updating token price...");

    try {
      const parsedPrice = ethers.parseEther(newPrice);
      const tx = await contract.updateTokenPrice(parsedPrice);

      notify.update(toastId, "Processing", "Confirming price update...");

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setReCall((prev) => prev + 1);
        notify.complete(
          toastId,
          `Token price updated to ${newPrice} ${CURRENCY}`,
        );
        return receipt;
      }
    } catch (err) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        err,
        "updating token price",
      );
      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }
      console.error(errorMessage);
      notify.fail(
        toastId,
        "Price update failed, please check your permissions",
      );
    }
  };

  const setSaleToken = async (tokenAddress) => {
    if (!contract || !address) return null;

    const toastId = notify.start("Setting sale token...");

    try {
      const tx = await contract.setSaleToken(tokenAddress);

      notify.update(toastId, "Processing", "Confirming token update...");

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setReCall((prev) => prev + 1);
        notify.complete(toastId, "Sale token updated successfully!");
        return receipt;
      }
    } catch (err) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        err,
        "setting sale token",
      );
      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }
      console.error(errorMessage);
      notify.fail(
        toastId,
        "Failed to set sale token, please check the address!",
      );
      return null;
    }
  };

  const withdrawAllTokens = async () => {
    if (!contract || !address) return null;

    const toastId = notify.start("Withdrawing tokens...");

    try {
      const tx = await contract.withdrawAllTokens();

      notify.update(toastId, "Processing", "Withdrawing all tokens...");

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setReCall((prev) => prev + 1);
        notify.complete(toastId, "All tokens withdrawn successfully!");
        return receipt;
      }
    } catch (err) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        err,
        "withdrawing tokens",
      );
      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }
      console.error(errorMessage);
      notify.fail(toastId, "Failed to withdraw tokens, please try again!");
      return null;
    }
  };

  const rescueTokens = async (tokenAddress) => {
    if (!contract || !address) return null;

    const toastId = notify.start("Rescuing tokens...");

    try {
      const tx = await contract.rescueTokens(tokenAddress);

      notify.update(toastId, "Processing", "Rescue operation in progress...");

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setReCall((prev) => prev + 1);
        notify.complete(toastId, "Tokens rescued successfully!");
        return receipt;
      }
    } catch (err) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        err,
        "rescuing tokens",
      );
      if (errorCode === "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }
      console.error(errorMessage);
      notify.fail(
        toastId,
        "Failed to rescue tokens, please check the token address!",
      );
      return null;
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}....${addr.substring(addr.length - 4)}`;
  };

  const formatTokenAmount = (amount, decimals = 18) => {
    if (!amount) return "0";
    return ethers.formatUnits(amount, decimals);
  };

  // BUG FIX 7: was missing await on contract call
  const isOwner = async () => {
    if (!contract || !address) return false;
    try {
      const ownerAddress = await contract.i_owner();
      return ownerAddress.toLowerCase() === address.toLowerCase();
    } catch (err) {
      console.error(handleTransactionError(err, "checking owner"));
      return false;
    }
  };

  const addTokenToMetaMask = async () => {
    const toastId = notify.start(`Adding ${TOKEN_SYMBOL} to MetaMask`);
    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: AGRITOKEN_ADDRESS,
            symbol: TOKEN_SYMBOL,
            decimals: TOKEN_DECIMAL,
            image: TOKEN_LOGO,
          },
        },
      });

      if (wasAdded) {
        notify.complete(toastId, "Successfully added token to MetaMask!");
      } else {
        notify.complete(toastId, "Failed to add the token");
      }
    } catch (err) {
      const { message: errorMessage } = handleTransactionError(
        err,
        "adding token to MetaMask",
      );
      notify.fail(toastId, `Failed to add token: ${errorMessage}`);
    }
  };

  const value = {
    provider,
    signer,
    contract,
    account: address,
    chainId,
    isConnected: !!address && !!contract,
    isConnecting,
    contractInfo,
    tokenBalance,
    error,
    reCall,
    globalLoad,
    buyToken,
    updateTokenPrice,
    setSaleToken,
    withdrawAllTokens,
    rescueTokens,
    formatAddress,
    formatTokenAmount,
    isOwner,
    isAdmin,
    setReCall,
    addTokenToMetaMask,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

export default Web3Context;
