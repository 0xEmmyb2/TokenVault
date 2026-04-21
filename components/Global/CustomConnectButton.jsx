import { ConnectButton } from "@rainbow-me/rainbowkit";
import Icons from "./SVG"; 

const baseButtonClass =
  "h-9 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 inline-flex items-center justify-center gap-1.5 backdrop-blur-sm";

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        // 1. DISCONNECTED
        if (!connected) {
          return (
            <button
              type="button"
              onClick={openConnectModal}
              className={`${baseButtonClass} bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/20 active:scale-95`}
            >
              <Icons.WalletIcon size={16} />
              Connect Wallet
            </button>
          );
        }

        // 2. WRONG NETWORK
        if (chain.unsupported) {
          return (
            <button
              type="button"
              onClick={openChainModal}
              className={`${baseButtonClass} bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/20`}
            >
              <Icons.ErrorXMark size={16} />
              Wrong Network
            </button>
          );
        }

        // 3. CONNECTED
        return (
          <div className="flex items-center gap-2">
            {/* Chain Switcher */}
            <button
              type="button"
              onClick={openChainModal}
              className={`${baseButtonClass} bg-gray-900/85 text-gray-200 border border-green-900/40 hover:bg-gray-800`}
            >
              {chain.hasIcon ? (
                <span className="w-4 h-4 rounded-full overflow-hidden shrink-0">
                  {chain.iconUrl ? (
                    <img
                      alt={chain.name ?? "Chain icon"}
                      src={chain.iconUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icons.NetworkIcon size={14} />
                  )}
                </span>
              ) : (
                <Icons.NetworkIcon size={14} />
              )}
              <span className="hidden sm:inline">{chain.name}</span>
              <Icons.ArrowDownIcon size={12} className="opacity-60" />
            </button>

            {/* Account Info */}
            <button
              type="button"
              onClick={openAccountModal}
              className={`${baseButtonClass} bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-400`}
            >
              <span className="max-w-[110px] truncate">{account.displayName}</span>
              {account.displayBalance && (
                <span className="hidden md:inline text-white/80 border-l border-white/20 pl-2 ml-1">
                  {account.displayBalance}
                </span>
              )}
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;