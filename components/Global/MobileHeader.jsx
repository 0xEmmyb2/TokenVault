import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import CustomConnectButton from "./CustomConnectButton";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "AgriToken";

const defaultLinks = [
  { label: "Home", href: "/" },
  { label: "Presale", href: "/presale" },
  { label: "Dashboard", href: "/dashboard" },
];

const MobileHeader = ({
  isDarkMode = true,
  toggleDarkMode,
  links = defaultLinks,
  showWalletButton = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="md:hidden sticky top-0 z-50">
      <div
        className={`h-14 px-4 border-b flex items-center justify-between ${
          isDarkMode
            ? "bg-gray-950/95 border-green-900/40"
            : "bg-white/95 border-green-200/70"
        } backdrop-blur-md`}
      >
        <Link href="/" onClick={closeMenu} className="inline-flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-600 to-emerald-500 text-white text-xs font-bold inline-flex items-center justify-center">
            A
          </span>
          <span className={isDarkMode ? "text-sm font-semibold text-white" : "text-sm font-semibold text-gray-900"}>
            {TOKEN_NAME}
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          {typeof toggleDarkMode === "function" && (
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`w-8 h-8 rounded-lg inline-flex items-center justify-center ${
                isDarkMode
                  ? "text-yellow-400 hover:bg-yellow-400/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
            className={`w-8 h-8 rounded-lg inline-flex items-center justify-center ${
              isDarkMode
                ? "text-gray-200 hover:bg-green-900/30"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        } ${isDarkMode ? "bg-gray-950 border-b border-green-900/40" : "bg-white border-b border-green-200/70"}`}
      >
        <nav className="px-4 py-4 space-y-1.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:bg-green-900/30 hover:text-green-300"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {showWalletButton && (
            <div className="pt-2">
              <CustomConnectButton />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default MobileHeader;
