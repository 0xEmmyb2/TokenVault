import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiBook,
  FiMap,
  FiFileText,
  FiCompass,
  FiActivity,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiCode,
} from "react-icons/fi";
import { GiWheat, GiSeedling } from "react-icons/gi";
import CustomConnectButton from "../Global/CustomConnectButton";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME;
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE;
const EXPLORER_TOKEN_URL = process.env.NEXT_PUBLIC_EXPLORER_TOKEN_URL;
const EXPLORER_ADDRESS_URL = process.env.NEXT_PUBLIC_EXPLORER_ADDRESS_URL;
const TBC_ADDRESS = process.env.NEXT_PUBLIC_TBC_ADDRESS;

// ── Announcement banner ────────────────────────────────────────────────────
const AnnouncementBanner = ({ isDarkMode }) => (
  <div className="relative py-2 overflow-hidden whitespace-nowrap">
    {/* Background */}
    <div
      className={`absolute inset-0 ${
        isDarkMode
          ? "bg-gradient-to-r from-green-900 via-emerald-800 to-green-900"
          : "bg-gradient-to-r from-green-600 via-emerald-500 to-green-600"
      }`}
    />
    {/* Subtle grain overlay */}
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "150px",
      }}
    />
    {/* Scrolling marquee text */}
    <div className="relative z-10 flex items-center gap-2 animate-marquee text-white text-xs font-medium tracking-wider uppercase">
      <span className="flex items-center gap-6 px-4">
        <span className="flex items-center gap-1.5">
          <GiWheat className="text-yellow-300 shrink-0" />
          {TOKEN_SYMBOL || "AGRI"} Token Pre-Sale is LIVE
        </span>
        <span className="text-green-300">✦</span>
        <span className="flex items-center gap-1.5">
          <GiSeedling className="text-lime-300 shrink-0" />
          Price: ${PER_TOKEN_USD_PRICE || "0.0035"} per token
        </span>
        <span className="text-green-300">✦</span>
        <span>Powering the Future of Agriculture on Blockchain</span>
        <span className="text-green-300">✦</span>
        <span className="flex items-center gap-1.5">
          <GiWheat className="text-yellow-300 shrink-0" />
          {TOKEN_SYMBOL || "AGRI"} Token Pre-Sale is LIVE
        </span>
        <span className="text-green-300">✦</span>
        <span>Powering the Future of Agriculture on Blockchain</span>
      </span>
    </div>
  </div>
);

// ── Mega menu ──────────────────────────────────────────────────────────────
const MegaMenu = ({ isDarkMode, data, onClose }) => {
  const cardBase = isDarkMode
    ? "bg-gray-900/95 border-green-900/60 text-gray-100"
    : "bg-white/98 border-green-200/60 text-gray-800";

  const linkHover = isDarkMode
    ? "hover:bg-green-900/40 hover:text-green-300"
    : "hover:bg-green-50 hover:text-green-700";

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] max-w-[95vw] rounded-2xl border shadow-2xl backdrop-blur-xl z-50 overflow-hidden transition-all duration-200 ${cardBase}`}
      style={{
        boxShadow: isDarkMode
          ? "0 25px 60px rgba(0,0,0,0.6)"
          : "0 25px 60px rgba(0,80,0,0.12)",
      }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-green-500 via-emerald-400 to-lime-500" />

      <div className="grid grid-cols-3 gap-0 p-6">
        {/* Column group */}
        {data.columns.map((col, ci) => (
          <div key={ci} className="px-3">
            <p
              className={`text-[10px] uppercase tracking-[0.15em] font-bold mb-3 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
            >
              {col.title}
            </p>
            <ul className="space-y-0.5">
              {col.links.map((link, li) => (
                <li key={li}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    onClick={onClose}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${linkHover}`}
                  >
                    <span className="text-base shrink-0">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Featured box */}
      <div className="mx-6 mb-6">
        <div
          className={`rounded-xl px-5 py-4 flex items-center justify-between ${data.featuredBox.bgClass}`}
        >
          <div>
            <p
              className={`font-semibold text-sm ${isDarkMode ? "text-green-300" : "text-green-800"}`}
            >
              {data.featuredBox.title}
            </p>
            <p
              className={`text-xs mt-0.5 leading-relaxed max-w-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {data.featuredBox.description}
            </p>
          </div>
          <Link
            href={data.featuredBox.linkUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="ml-4 shrink-0 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-400 transition-all duration-200 shadow-md"
          >
            {data.featuredBox.linkText} →
          </Link>
        </div>
      </div>
    </div>
  );
};

// ── Resources sub-menu ─────────────────────────────────────────────────────
const ResourcesMenu = ({ isDarkMode, data, onClose }) => {
  const cardBase = isDarkMode
    ? "bg-gray-900/95 border-green-900/60 text-gray-100"
    : "bg-white/98 border-green-200/60 text-gray-800";

  const linkHover = isDarkMode
    ? "hover:bg-green-900/40 hover:text-green-300"
    : "hover:bg-green-50 hover:text-green-700";

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] max-w-[95vw] rounded-2xl border shadow-2xl backdrop-blur-xl z-50 overflow-hidden transition-all duration-200 ${cardBase}`}
      style={{
        boxShadow: isDarkMode
          ? "0 25px 60px rgba(0,0,0,0.6)"
          : "0 25px 60px rgba(0,80,0,0.12)",
      }}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-lime-500 via-green-400 to-emerald-500" />
      <div className="grid grid-cols-2 gap-0 p-6">
        {data.columns.map((col, ci) => (
          <div key={ci} className="px-3">
            <p
              className={`text-[10px] uppercase tracking-[0.15em] font-bold mb-3 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
            >
              {col.title}
            </p>
            <ul className="space-y-0.5">
              {col.links.map((link, li) => (
                <li key={li}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    onClick={onClose}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${linkHover}`}
                  >
                    <span className="text-base shrink-0">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-6 mb-6">
        <div
          className={`rounded-xl px-5 py-4 flex items-center justify-between ${data.featuredBox.bgClass}`}
        >
          <div>
            <p
              className={`font-semibold text-sm ${isDarkMode ? "text-green-300" : "text-green-800"}`}
            >
              {data.featuredBox.title}
            </p>
            <p
              className={`text-xs mt-0.5 leading-relaxed max-w-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {data.featuredBox.description}
            </p>
          </div>
          <Link
            href={data.featuredBox.linkUrl}
            onClick={onClose}
            className="ml-4 shrink-0 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-lime-600 to-green-500 text-white hover:from-lime-500 hover:to-green-400 transition-all duration-200 shadow-md"
          >
            {data.featuredBox.linkText} →
          </Link>
        </div>
      </div>
    </div>
  );
};

// ── Main Header ────────────────────────────────────────────────────────────
const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close mega menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMenuEnter = (key) => {
    clearTimeout(timeoutRef.current);
    setActiveMegaMenu(key);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 250);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const closeAll = () => {
    setActiveMegaMenu(null);
    setIsOpen(false);
    setMobileExpanded(null);
  };

  // ── Data ────────────────────────────────────────────────────────────────
  const ecosystemMenu = {
    columns: [
      {
        title: "Core Technology",
        links: [
          {
            icon: <FiActivity className="text-emerald-500" />,
            label: "AgriToken",
            href: "https://agritoken.gitbook.io/gitbook",
          },
          {
            icon: <FiCpu className="text-green-500" />,
            label: "AIVM",
            href: "https://agritoken.gitbook.io/agritoken/agritoken-docs/quickstart",
          },
          {
            icon: <FiLayers className="text-lime-500" />,
            label: "Framework",
            href: "https://agritoken.gitbook.io/agritoken/agritoken-docs",
          },
        ],
      },
      {
        title: "Applications",
        links: [
          {
            icon: <FiCode className="text-emerald-500" />,
            label: "How To Buy",
            href: "https://agritoken.gitbook.io/agritoken/agritoken-docs/publish-your-docs",
          },
          {
            icon: <FiCompass className="text-green-500" />,
            label: "Explorer",
            href: `${EXPLORER_TOKEN_URL}${TBC_ADDRESS}`,
          },
          {
            icon: <FiMap className="text-lime-500" />,
            label: "Create Wallet",
            href: "https://agritoken.gitbook.io/agritoken/create-a-wallet",
          },
        ],
      },
      {
        title: "Community",
        links: [
          {
            icon: <FiFileText className="text-emerald-500" />,
            label: "Token Docs",
            href: "https://agritoken.gitbook.io/agritoken/tokenomics",
          },
          {
            icon: <FiBook className="text-green-500" />,
            label: "Referral",
            href: "https://agritoken.gitbook.io/agritoken/referral",
          },
          {
            icon: <FiCompass className="text-lime-500" />,
            label: "Audits",
            href: "https://agritoken.gitbook.io/agritoken/audits",
          },
        ],
      },
    ],
    featuredBox: {
      title: "Join Our Community",
      description:
        "Be part of the AgriToken Revolution — shaping the future of blockchain-powered agriculture.",
      linkText: "Join Discord",
      linkUrl: "https://discord.gg/Dr454dPp",
      bgClass: isDarkMode
        ? "bg-green-900/30 border border-green-800/50"
        : "bg-green-50 border border-green-200/60",
    },
  };

  const resourcesMenu = {
    columns: [
      {
        title: "Learn",
        links: [
          {
            icon: <FiFileText className="text-emerald-500" />,
            label: "Whitepaper",
            href: "https://agritoken.gitbook.io/agritoken/agritoken-docs/quickstart",
          },
          {
            icon: <FiMap className="text-green-500" />,
            label: "Import Token",
            href: "https://linktum.gitbook.io/agritoken/import-token",
          },
        ],
      },
      {
        title: "Tools",
        links: [
          {
            icon: <FiCompass className="text-emerald-500" />,
            label: "Block Explorer",
            href: `${EXPLORER_ADDRESS_URL}${TBC_ADDRESS}`,
          },
          {
            icon: <FiDatabase className="text-green-500" />,
            label: "Analytics",
            href: "/dashboard",
          },
          {
            icon: <FiCpu className="text-lime-500" />,
            label: "Dashboard",
            href: "/dashboard",
          },
        ],
      },
    ],
    featuredBox: {
      title: "Start Building Today",
      description:
        "Access developer resources and start building on the AgriToken Protocol.",
      linkText: "Developer Docs",
      linkUrl: "/dashboard",
      bgClass: isDarkMode
        ? "bg-lime-900/30 border border-lime-800/50"
        : "bg-lime-50 border border-lime-200/60",
    },
  };

  // ── Nav link styles ──────────────────────────────────────────────────────
  const navLinkClass = `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isDarkMode
      ? "text-gray-300 hover:text-green-300 hover:bg-green-900/30"
      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
  }`;

  const activeNavClass = isDarkMode
    ? "text-green-300 bg-green-900/30"
    : "text-green-700 bg-green-50";

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Spacer to push content below fixed header */}
      <div className="h-[88px]" aria-hidden="true" />

      <header
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isDarkMode
            ? isScrolled
              ? "bg-gray-950/95 backdrop-blur-md border-b border-green-900/40 shadow-[0_4px_30px_rgba(0,80,0,0.2)]"
              : "bg-gray-950/90 backdrop-blur-sm border-b border-green-900/30"
            : isScrolled
              ? "bg-white/95 backdrop-blur-md border-b border-green-200/60 shadow-[0_4px_30px_rgba(0,100,0,0.08)]"
              : "bg-white/90 backdrop-blur-sm border-b border-green-100/60"
        }`}
      >
        {/* Announcement Banner — hidden when scrolled */}
        {!isScrolled && <AnnouncementBanner isDarkMode={isDarkMode} />}

        {/* Main nav row */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={closeAll}
          >
            {/* Leaf mark */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105 ${
                isDarkMode
                  ? "bg-gradient-to-br from-green-600 to-emerald-700 shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                  : "bg-gradient-to-br from-green-500 to-emerald-600 shadow-[0_0_12px_rgba(52,211,153,0.25)]"
              }`}
            >
              <GiWheat className="text-white text-lg" />
            </div>
            <span
              className={`font-bold text-lg tracking-tight hidden sm:block ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              {TOKEN_NAME || "AgriToken"}
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <Link href="/" className={navLinkClass}>
              Home
            </Link>

            {/* Ecosystem mega menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("ecosystem")}
              onMouseLeave={handleMenuLeave}
            >
              <button
                type="button"
                className={`${navLinkClass} ${activeMegaMenu === "ecosystem" ? activeNavClass : ""}`}
                onClick={() =>
                  setActiveMegaMenu(
                    activeMegaMenu === "ecosystem" ? null : "ecosystem",
                  )
                }
                aria-expanded={activeMegaMenu === "ecosystem"}
              >
                Ecosystem
                <FiChevronDown
                  className={`text-xs transition-transform duration-200 ${activeMegaMenu === "ecosystem" ? "rotate-180" : ""}`}
                />
              </button>
              {activeMegaMenu === "ecosystem" && (
                <MegaMenu
                  isDarkMode={isDarkMode}
                  data={ecosystemMenu}
                  onClose={closeAll}
                />
              )}
            </div>

            {/* Presale */}
            <Link href="/presale" className={navLinkClass}>
              Presale
            </Link>

            {/* Resources mega menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter("resources")}
              onMouseLeave={handleMenuLeave}
            >
              <button
                type="button"
                className={`${navLinkClass} ${activeMegaMenu === "resources" ? activeNavClass : ""}`}
                onClick={() =>
                  setActiveMegaMenu(
                    activeMegaMenu === "resources" ? null : "resources",
                  )
                }
                aria-expanded={activeMegaMenu === "resources"}
              >
                Resources
                <FiChevronDown
                  className={`text-xs transition-transform duration-200 ${activeMegaMenu === "resources" ? "rotate-180" : ""}`}
                />
              </button>
              {activeMegaMenu === "resources" && (
                <ResourcesMenu
                  isDarkMode={isDarkMode}
                  data={resourcesMenu}
                  onClose={closeAll}
                />
              )}
            </div>

            {/* Dashboard */}
            <Link href="/dashboard" className={navLinkClass}>
              Dashboard
            </Link>
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                isDarkMode
                  ? "text-yellow-400 hover:bg-yellow-400/10"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? (
                <FiSun className="text-base" />
              ) : (
                <FiMoon className="text-base" />
              )}
            </button>

            {/* Connect wallet — hidden on small mobile */}
            <div className="hidden sm:block">
              <CustomConnectButton active={true} />
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
              className={`lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:bg-green-900/30"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {isOpen ? (
                <FiX className="text-lg" />
              ) : (
                <FiMenu className="text-lg" />
              )}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu drawer ── */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } ${isDarkMode ? "bg-gray-950 border-t border-green-900/40" : "bg-white border-t border-green-100"}`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <MobileNavLink
              href="/"
              label="Home"
              isDarkMode={isDarkMode}
              onClick={closeAll}
            />

            {/* Ecosystem accordion */}
            <MobileAccordion
              label="Ecosystem"
              isDarkMode={isDarkMode}
              isOpen={mobileExpanded === "ecosystem"}
              onToggle={() =>
                setMobileExpanded(
                  mobileExpanded === "ecosystem" ? null : "ecosystem",
                )
              }
            >
              {ecosystemMenu.columns.map((col, ci) => (
                <div key={ci} className="mb-3">
                  <p
                    className={`text-[10px] uppercase tracking-widest font-bold px-3 mb-1 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    {col.title}
                  </p>
                  {col.links.map((link, li) => (
                    <MobileNavLink
                      key={li}
                      href={link.href}
                      label={link.label}
                      isDarkMode={isDarkMode}
                      onClick={closeAll}
                      icon={link.icon}
                    />
                  ))}
                </div>
              ))}
            </MobileAccordion>

            <MobileNavLink
              href="/presale"
              label="Presale"
              isDarkMode={isDarkMode}
              onClick={closeAll}
            />

            {/* Resources accordion */}
            <MobileAccordion
              label="Resources"
              isDarkMode={isDarkMode}
              isOpen={mobileExpanded === "resources"}
              onToggle={() =>
                setMobileExpanded(
                  mobileExpanded === "resources" ? null : "resources",
                )
              }
            >
              {resourcesMenu.columns.map((col, ci) => (
                <div key={ci} className="mb-3">
                  <p
                    className={`text-[10px] uppercase tracking-widest font-bold px-3 mb-1 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    {col.title}
                  </p>
                  {col.links.map((link, li) => (
                    <MobileNavLink
                      key={li}
                      href={link.href}
                      label={link.label}
                      isDarkMode={isDarkMode}
                      onClick={closeAll}
                      icon={link.icon}
                    />
                  ))}
                </div>
              ))}
            </MobileAccordion>

            <MobileNavLink
              href="/dashboard"
              label="Dashboard"
              isDarkMode={isDarkMode}
              onClick={closeAll}
            />

            {/* Wallet button on mobile */}
            <div className="pt-3 pb-2 sm:hidden">
              <CustomConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Marquee keyframe — injected once */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
          width: max-content;
        }
      `}</style>
    </>
  );
};

// ── Helper sub-components ──────────────────────────────────────────────────

const MobileNavLink = ({ href, label, isDarkMode, onClick, icon }) => (
  <Link
    href={href}
    target={href.startsWith("http") ? "_blank" : "_self"}
    rel="noreferrer"
    onClick={onClick}
    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
      isDarkMode
        ? "text-gray-300 hover:text-green-300 hover:bg-green-900/30"
        : "text-gray-700 hover:text-green-700 hover:bg-green-50"
    }`}
  >
    {icon && <span className="text-base">{icon}</span>}
    {label}
  </Link>
);

const MobileAccordion = ({ label, isDarkMode, isOpen, onToggle, children }) => (
  <div>
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
        isDarkMode
          ? "text-gray-300 hover:text-green-300 hover:bg-green-900/30"
          : "text-gray-700 hover:text-green-700 hover:bg-green-50"
      }`}
    >
      {label}
      <FiChevronDown
        className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-green-500" : ""}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-[600px] opacity-100 mt-1 ml-3" : "max-h-0 opacity-0"
      }`}
    >
      {children}
    </div>
  </div>
);

export default Header;
