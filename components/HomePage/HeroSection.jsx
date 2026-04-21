import Link from "next/link";
import { FiArrowRight, FiBarChart2, FiShield, FiGlobe } from "react-icons/fi";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "AgriToken";
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "AGRI";
const TOKEN_SUPPLY = process.env.NEXT_PUBLIC_TOKEN_SUPPLY || "1,000,000,000";
const TOKEN_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE || "0.0035";
const BLOCKCHAIN = process.env.NEXT_PUBLIC_BLOCKCHAIN || "Blockchain";

const metrics = [
  { label: "Token", value: TOKEN_SYMBOL },
  { label: "Network", value: BLOCKCHAIN },
  { label: "Supply", value: TOKEN_SUPPLY },
  { label: "Current Price", value: `$${TOKEN_PRICE}` },
];

const highlights = [
  {
    title: "Transparent Infrastructure",
    description: "On-chain visibility for better trust and accountability.",
    icon: FiGlobe,
  },
  {
    title: "Security Focused",
    description: "Smart-contract based operations with resilient design.",
    icon: FiShield,
  },
  {
    title: "Growth Ready",
    description: "Scalable architecture built for long-term ecosystem expansion.",
    icon: FiBarChart2,
  },
];

const HeroSection = ({ isDarkMode = true }) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-10 sm:pb-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        <div
          className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${
            isDarkMode
              ? "bg-gray-950 border-green-900/50"
              : "bg-white border-green-200/70 shadow-[0_16px_40px_rgba(0,100,0,0.08)]"
          }`}
        >
          <p
            className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            TokenVault
          </p>
          <h1
            className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {TOKEN_NAME}: powering the next generation of decentralized agriculture.
          </h1>
          <p
            className={`mt-5 text-sm sm:text-base leading-relaxed max-w-2xl ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Access a clear and modern blockchain experience for agriculture-focused
            participation, ecosystem growth, and transparent token utility.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/presale"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:from-green-500 hover:to-emerald-400"
            >
              Join Presale
              <FiArrowRight />
            </Link>
            <Link
              href="/dashboard"
              className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                isDarkMode
                  ? "text-green-300 hover:text-green-200"
                  : "text-green-700 hover:text-green-800"
              }`}
            >
              Open Dashboard
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className={`rounded-xl border px-4 py-3 ${
                  isDarkMode
                    ? "bg-gray-900/60 border-green-900/40"
                    : "bg-green-50/60 border-green-200/70"
                }`}
              >
                <p
                  className={`text-[11px] uppercase tracking-[0.12em] ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {metric.label}
                </p>
                <p
                  className={`mt-1 text-sm sm:text-base font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${
            isDarkMode
              ? "bg-gradient-to-br from-green-950/40 to-gray-950 border-green-900/50"
              : "bg-gradient-to-br from-green-50 to-white border-green-200/70"
          }`}
        >
          <p
            className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Why {TOKEN_SYMBOL}
          </p>

          <div className="mt-5 space-y-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={`rounded-xl border p-4 ${
                    isDarkMode
                      ? "bg-gray-900/50 border-green-900/50"
                      : "bg-white/80 border-green-200/70"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isDarkMode
                          ? "bg-green-900/40 text-green-300"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      <Icon className="text-base" />
                    </div>
                    <div>
                      <h3
                        className={`text-sm sm:text-base font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-1 text-sm leading-relaxed ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
