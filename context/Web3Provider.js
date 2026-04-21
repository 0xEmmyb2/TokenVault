import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useChainId, useConnect, useBalance } from "wagmi";

import { useToast } from "./ToastContext";
import TOKEN_ICO_ABI from "./ABI.json";
import { useEthersProviders, useEthersSigner } from "../provider/hooks";
import { config } from "../provider/wagmiConfig";
import { handleTransactionError, ERC20_ABI, generateId } from "./Utility";

const AGRITOKEN_ADDRESS = process.env.NEXT_PUBLIC_AGRITOKEN_ADDRESS;
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
const TOKEN_DECIMAL = process.env.NEXT_PUBLIC_TOKEN_DECIMAL;
const TOKEN_LOGO = process.env.NEXT_PUBLIC_TOKEN_LOGO;
const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE;
const TokenICOABI = TOKEN_ICO_ABI.abi;

const Web3Context = createContext();

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ICO_ADDRESS;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

const fallbackProvider = new ethers.JsonRpcProvider(RPC_URL);

export const Web3Provider = ({ children }) => {
  const { notify } = useToast;

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { balance } = useBalance({ config });
  const { connect, connectors } = useConnect();
  const [reCall, setReCall] = useState(0);
  const [globalLoad, setGlobalLoad] = useState(false);

  const provider = useEthersProvider();
  const signer = useEthersSigner();
  const fallbackProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const [isConnecting, setIsConnecting] = useState(false);

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

  const [error, setError] = useState(null);

  useEffect(() => {
    const initContract = () => {
      if (provider && signer) {
        try {
          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            TOKEN_ICO_ABI,
            signer,
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing contract:", error);
          setError("Failed to initialize the contract");
        }
      }
    };
    initContract();
  }, [provider, signer]);

  useEffect(() => {
    const fetchContractInfo = async () => {
      setGlobalLoad(true);
      try {
        const currentProvider = provider || fallbackProvider;

        const readOnlyContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          TOKEN_ICO_ABI,
          currentProvider,
        );

        const info = await readOnlyContract.getContractInfo();

        const tokenDecimals = parseInt(info.tokenDecimals) || 18;

        setContractInfo({
          tbcAddress: info.tokenAddress,
          tbcBalance: ethers.formatUnits(
            info.tokenBalance,
            tokenDecimals,
          ),
          ethPrice: ethers.formatUnits(info.ethPrice, 18),
          totalSold: ethers.formatUnits(info.totalSold, tokenDecimals),
        });

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

          setTokenBalance({
            ...prev,
            userTbcBalance: ethers.formatUnits(
              userTokenBalance,
              tokenDecimals,
            ),
            contractEthBalance: ethers.formatUnits(contractEthBalance),
            totalSupply: ethers.formatUnits(totalSupply, tokenDecimals),
            userEthBalance: ethers.formatUnits(userEthBalance),
            ethPrice: ethers.formatUnits(info.ethPrice, 18),
            tbcBalance: ethers.formatUnits(
              info.tokenBalance,
              tokenDecimals,
            ),
          });
        }

        setGlobalLoad(false);
      } catch (error) {
        setGlobalLoad(false);
        console.error("Error fetching contract info:", error);
        setError("Failed to fetch contract info");
      }
    };
    fetchContractInfo();
  }, [contract, address, provider, signer, reCall]);

  const buyToken = async (ethAmount) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Buying ${TOKEN_SYMBOL} with ${CURRENCY}...`);

    try {
      const ethValue = ethers.parseEther(ethAmount);

      const tx = await contract.buyToken({
        value: ethValue,
      });

      notify.update(toastId, "Processing", "Waiting for confirmation");

      const receipt = tx.wait();

      if (receipt.status === 1) {
        const tokenPrice = PER_TOKEN_USD_PRICE;
        const tokensReceived = parseFloat(ethAmount) / tokenPrice;

        const txDetails = {
          timestamp: Date.now(),
          user: address,
          tokenIn: CURRENCY,
          tokenOut: TOKEN_SYMBOL,
          amountIn: ethAmount,
          amountOut: tokensReceived.toString(),
          transactionType: "BUY",
          hash: receipt.transactionHash,
        };

        saveTransactionToLocalStorage(txDetails);

        setReCall((prev) => prev + 1);

        notify.complete(
          toastId,
          `Successfully purchased ${TOKEN_SYMBOL} tokens`,
        );

        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
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
      const existingTransaction =
        JSON.parse(localStorage.getItem("tokenTransactions")) || [];

      existingTransaction.push(txData);

      localStorage.setItem(
        "tokenTransactions",
        JSON.stringify(existingTransaction),
      );

      console.log("Transaction saved to localStorage", txData);
    } catch (error) {
      console.error("Failed to save transaction to locaStorage", error);
    }
  };

  const updateTokenPrice = async (newPrice) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Updating token price...`);

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
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        "updating token price",
      );

      if (errorCode == "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }

      console.error(errorMessage);

      notify.fail(toastId, "Price Update, Please check your permissions");
    }
  };

  const setSaleToken = async (tokenAddress) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Setting sale token...`);

    try {
      const tx = await contract.setSaleToken(tokenAddress);

      notify.update(toastId, "Processing", "Confirming token update...");

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setReCall((prev) => prev + 1);
        notify.complete(toastId, `Sale token updated successfully!`);

        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        `Setting sale token`,
      );

      if (errorCode == "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }

      console.error(errorMessage);
      notify.fail(
        toastId,
        "Failed to set sale token, Please check your address!",
      );

      return null;
    }
  };

  const withdrawAllTokens = async () => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Withdraw tokens...`);

    try {
      const tx = await contract.withdrawAllTokens();

      notify.update(toastId, "Processing", "Withdrawing all tokens...");

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setReCall((prev) => prev + 1);
        notify.complete(toastId, "All tokens withdrawn sucessfully!");

        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        `Withdrawing token`,
      );

      if (errorCode == "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }

      console.error(errorMessage);

      notify.fail(toastId, "Failed to withdraw tokens, Please try again!");
      return null;
    }
  };

  const rescueTokens = async (tokenAddress) => {
    if (!contract || !address) return null;

    const toastId = notify.start(`Rescuing tokens...`);

    try {
      const tx = await contract.rescueTokens(tokenAddress);

      notify.update(toastId, "Processing", "Rescue operations...");

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setReCall((prev) => prev + 1);
        notify.complete(toastId, "Tokens rescued successfully!");

        return receipt;
      }
    } catch (error) {
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        "Rescuing tokens",
      );

      if (errorCode == "ACTION_REJECTED") {
        notify.reject(toastId, "Transaction rejected by the user!");
        return null;
      }

      console.error(errorMessage);
      notify.fail(
        toastId,
        "Failed to rescue tokens, Please try again or check the token address!",
      );
      return null;
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";

    return `${address.substring(0, 6)}....${address.substring(address.length - 4)}`;
  };

  const formatTokenAmount = (amount, decimals = 18) => {
    if (!amount) return "0";
    return ethers.formatUnits(amount, decimals);
  };

  const isOwner = async () => {
    if (!contract || !address) return false;

    try {
      const ownerAddress = contract.i_owner();

      return ownerAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
      const errorMessage = handleTransactionError(error, "Withdraw tokens");
      console.log(errorMessage);
      return false;
    }
  };

  const addTokenToMetaMask = async () => {
    const toastId = notify.start(`Adding ${TOKEN_SYMBOL} Token to MetaMask`);

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
    } catch (error) {
      console.error(error);
      const { message: errorMessage, code: errorCode } = handleTransactionError(
        error,
        "Token Addition error",
      );

      notify.fail(
        toastId,
        `Transaction failed: ${errorMessage.message === "undefined" ? "Not Supported" : errorMessage.message}`,
      );
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
    formatAddress,
    formatTokenAmount,
    isOwner,
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
}

export default Web3Context;
