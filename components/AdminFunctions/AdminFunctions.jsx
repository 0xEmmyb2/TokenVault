import { useMemo, useState } from "react";
import { ethers } from "ethers";
import {
  FiSettings,
  FiShield,
  FiShoppingCart,
  FiDatabase,
  FiRefreshCw,
} from "react-icons/fi";
import { useWeb3 } from "../../context/Web3Provider";

const AdminFunctions = ({ isDarkMode = true }) => {
  const {
    account,
    contract,
    contractInfo,
    globalLoad,
    buyToken,
    updateTokenPrice,
    setSaleToken,
    withdrawAllTokens,
    rescueTokens,
    setReCall,
  } = useWeb3();

  const [newTokenPrice, setNewTokenPrice] = useState("");
  const [saleTokenAddress, setSaleTokenAddress] = useState("");
  const [buyEthAmount, setBuyEthAmount] = useState("");
  const [rescueTokenAddress, setRescueTokenAddress] = useState("");
  const [busyAction, setBusyAction] = useState("");

  const isConnected = Boolean(account);
  const canUseRescue = typeof rescueTokens === "function";

  const formattedInfo = useMemo(() => {
    if (!contractInfo) return null;

    return {
      tokenAddress: contractInfo.tbcAddress || "-",
      tokenBalance: contractInfo.tbcBalance || "0",
      tokenPriceEth: contractInfo.ethPrice || "0",
      totalSold: contractInfo.totalSold || "0",
    };
  }, [contractInfo]);

  const withBusy = async (key, fn) => {
    setBusyAction(key);
    try {
      await fn();
    } finally {
      setBusyAction("");
    }
  };

  const handleUpdateTokenPrice = async (event) => {
    event.preventDefault();
    if (!newTokenPrice) return;

    await withBusy("updateTokenPrice", async () => {
      await updateTokenPrice?.(newTokenPrice);
      setNewTokenPrice("");
    });
  };

  const handleSetSaleToken = async (event) => {
    event.preventDefault();
    if (!ethers.isAddress(saleTokenAddress)) return;

    await withBusy("setSaleToken", async () => {
      await setSaleToken?.(saleTokenAddress);
      setSaleTokenAddress("");
    });
  };

  const handleWithdrawAllTokens = async () => {
    await withBusy("withdrawAllTokens", async () => {
      await withdrawAllTokens?.();
    });
  };

  const handleBuyToken = async (event) => {
    event.preventDefault();
    if (!buyEthAmount) return;

    await withBusy("buyToken", async () => {
      await buyToken?.(buyEthAmount);
      setBuyEthAmount("");
    });
  };

  const handleRescueTokens = async (event) => {
    event.preventDefault();
    if (!canUseRescue || !ethers.isAddress(rescueTokenAddress)) return;

    await withBusy("rescueTokens", async () => {
      await rescueTokens(rescueTokenAddress);
      setRescueTokenAddress("");
    });
  };

  const handleGetContractInfo = async () => {
    if (!contract || !setReCall) return;

    await withBusy("getContractInfo", async () => {
      setReCall((prev) => prev + 1);
    });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto space-y-6">
        <header
          className={`rounded-2xl border p-5 sm:p-6 ${
            isDarkMode
              ? "bg-gray-950 border-green-900/50"
              : "bg-white border-green-200/70"
          }`}
        >
          <p
            className={`text-xs uppercase tracking-[0.14em] font-semibold ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Admin Functions
          </p>
          <h2
            className={`mt-2 text-2xl sm:text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Manage contract controls and user actions in one place.
          </h2>
          <p className={`mt-3 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Connected wallet:{" "}
            <span className="font-semibold">{isConnected ? account : "Not connected"}</span>
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Admin Actions" icon={FiShield} isDarkMode={isDarkMode}>
            <FormRow
              label="Update Token Price (ETH)"
              buttonLabel="Update Price"
              onSubmit={handleUpdateTokenPrice}
              isDarkMode={isDarkMode}
              disabled={!isConnected}
              isLoading={busyAction === "updateTokenPrice"}
            >
              <input
                value={newTokenPrice}
                onChange={(e) => setNewTokenPrice(e.target.value)}
                placeholder="0.001"
                className={inputClass(isDarkMode)}
              />
            </FormRow>

            <FormRow
              label="Set Sale Token Address"
              buttonLabel="Set Token"
              onSubmit={handleSetSaleToken}
              isDarkMode={isDarkMode}
              disabled={!isConnected}
              isLoading={busyAction === "setSaleToken"}
            >
              <input
                value={saleTokenAddress}
                onChange={(e) => setSaleTokenAddress(e.target.value)}
                placeholder="0x..."
                className={inputClass(isDarkMode)}
              />
            </FormRow>

            <button
              type="button"
              onClick={handleWithdrawAllTokens}
              disabled={!isConnected || busyAction === "withdrawAllTokens"}
              className={primaryButtonClass(isDarkMode)}
            >
              {busyAction === "withdrawAllTokens" ? "Withdrawing..." : "Withdraw All Tokens"}
            </button>
          </Panel>

          <Panel title="User Actions" icon={FiShoppingCart} isDarkMode={isDarkMode}>
            <FormRow
              label="Buy Token (ETH)"
              buttonLabel="Buy Token"
              onSubmit={handleBuyToken}
              isDarkMode={isDarkMode}
              disabled={!isConnected}
              isLoading={busyAction === "buyToken"}
            >
              <input
                value={buyEthAmount}
                onChange={(e) => setBuyEthAmount(e.target.value)}
                placeholder="0.01"
                className={inputClass(isDarkMode)}
              />
            </FormRow>

            <FormRow
              label="Rescue Tokens (token address)"
              buttonLabel="Rescue"
              onSubmit={handleRescueTokens}
              isDarkMode={isDarkMode}
              disabled={!isConnected || !canUseRescue}
              isLoading={busyAction === "rescueTokens"}
            >
              <input
                value={rescueTokenAddress}
                onChange={(e) => setRescueTokenAddress(e.target.value)}
                placeholder="0x..."
                className={inputClass(isDarkMode)}
              />
            </FormRow>

            {!canUseRescue && (
              <p className={`text-xs ${isDarkMode ? "text-amber-300" : "text-amber-700"}`}>
                `rescueTokens` is not exposed in `Web3Provider` yet.
              </p>
            )}

            <button
              type="button"
              onClick={handleGetContractInfo}
              disabled={busyAction === "getContractInfo"}
              className={secondaryButtonClass(isDarkMode)}
            >
              <FiRefreshCw className={busyAction === "getContractInfo" ? "animate-spin" : ""} />
              {busyAction === "getContractInfo" ? "Refreshing..." : "Get Contract Info"}
            </button>
          </Panel>
        </div>

        <Panel title="Contract Info" icon={FiDatabase} isDarkMode={isDarkMode}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <InfoCard
              label="Sale Token"
              value={formattedInfo?.tokenAddress || "-"}
              isDarkMode={isDarkMode}
            />
            <InfoCard
              label="Contract Token Balance"
              value={formattedInfo?.tokenBalance || "0"}
              isDarkMode={isDarkMode}
            />
            <InfoCard
              label="Price (ETH)"
              value={formattedInfo?.tokenPriceEth || "0"}
              isDarkMode={isDarkMode}
            />
            <InfoCard
              label="Total Sold"
              value={formattedInfo?.totalSold || "0"}
              isDarkMode={isDarkMode}
            />
          </div>
          {globalLoad && (
            <p className={`mt-3 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Loading latest contract details...
            </p>
          )}
          <p className={`mt-3 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Note: On-chain permissions still apply. In the current contract, `rescueTokens` is owner-only.
          </p>
        </Panel>
      </div>
    </section>
  );
};

const Panel = ({ title, icon: Icon, isDarkMode, children }) => (
  <article
    className={`rounded-2xl border p-5 sm:p-6 ${
      isDarkMode ? "bg-gray-950 border-green-900/50" : "bg-white border-green-200/70"
    }`}
  >
    <div className="flex items-center gap-2 mb-4">
      <Icon className={isDarkMode ? "text-green-400" : "text-green-700"} />
      <h3 className={isDarkMode ? "font-semibold text-white" : "font-semibold text-gray-900"}>
        {title}
      </h3>
    </div>
    <div className="space-y-3">{children}</div>
  </article>
);

const FormRow = ({
  label,
  buttonLabel,
  onSubmit,
  disabled,
  isLoading,
  isDarkMode,
  children,
}) => (
  <form onSubmit={onSubmit} className="space-y-2">
    <label className={isDarkMode ? "text-sm text-gray-300" : "text-sm text-gray-700"}>
      {label}
    </label>
    <div className="flex gap-2">
      <div className="flex-1">{children}</div>
      <button
        type="submit"
        disabled={disabled || isLoading}
        className={primaryButtonClass(isDarkMode)}
      >
        {isLoading ? "Processing..." : buttonLabel}
      </button>
    </div>
  </form>
);

const InfoCard = ({ label, value, isDarkMode }) => (
  <div
    className={`rounded-xl border p-3 ${
      isDarkMode ? "bg-gray-900/60 border-green-900/40" : "bg-green-50 border-green-200"
    }`}
  >
    <p className={isDarkMode ? "text-xs text-gray-400" : "text-xs text-gray-500"}>{label}</p>
    <p className={`mt-1 text-sm break-all ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {value}
    </p>
  </div>
);

const inputClass = (isDarkMode) =>
  `w-full rounded-lg border px-3 py-2 text-sm outline-none ${
    isDarkMode
      ? "bg-gray-900 border-green-900/50 text-gray-100 placeholder:text-gray-500"
      : "bg-white border-green-200 text-gray-900 placeholder:text-gray-400"
  }`;

const primaryButtonClass = (isDarkMode) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    isDarkMode
      ? "bg-green-700 hover:bg-green-600 text-white disabled:bg-gray-700"
      : "bg-green-600 hover:bg-green-500 text-white disabled:bg-gray-300"
  }`;

const secondaryButtonClass = (isDarkMode) =>
  `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    isDarkMode
      ? "bg-gray-800 hover:bg-gray-700 text-gray-100 disabled:bg-gray-700"
      : "bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:bg-gray-200"
  }`;

export default AdminFunctions;
