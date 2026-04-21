import Link from "next/link";
import { FiMoon, FiSun } from "react-icons/fi";
import CustomConnectButton from "./CustomConnectButton";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "AgriToken";

const Header = ({
  isDarkMode = true,
  toggleDarkMode,
  showThemeToggle = true,
  showWalletButton = true,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md ${
        isDarkMode
          ? "bg-gray-950/90 border-green-900/40"
          : "bg-white/90 border-green-200/70"
      }`}
    >
      <nav className="max-w-7xl mx-auto h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-emerald-500 text-white text-sm font-bold inline-flex items-center justify-center">
            A
          </span>
          <span
            className={`text-base sm:text-lg font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {TOKEN_NAME}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {showThemeToggle && typeof toggleDarkMode === "function" && (
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`w-9 h-9 rounded-lg inline-flex items-center justify-center ${
                isDarkMode
                  ? "text-yellow-400 hover:bg-yellow-400/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
          )}

          {showWalletButton && <CustomConnectButton />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
