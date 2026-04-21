import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "AGRI";
const TOKEN_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE || "0.0035";

const ctaPoints = [
  `Entry price starts at $${TOKEN_PRICE} per ${TOKEN_SYMBOL}`,
  "Secure wallet connection in a few clicks",
  "Transparent tracking through blockchain explorer",
];

const HeroCTAComponent = ({ isDarkMode = true }) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div
          className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${
            isDarkMode
              ? "bg-gradient-to-r from-green-950/50 via-gray-950 to-green-950/50 border-green-900/50"
              : "bg-gradient-to-r from-green-50 via-white to-green-50 border-green-200/70 shadow-[0_16px_40px_rgba(0,100,0,0.08)]"
          }`}
        >
          <div className="max-w-3xl">
            <p
              className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
                isDarkMode ? "text-green-400" : "text-green-700"
              }`}
            >
              Start Your Journey
            </p>
            <h2
              className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Join the {TOKEN_SYMBOL} ecosystem and participate in the future of
              decentralized agriculture.
            </h2>
            <p
              className={`mt-4 text-sm sm:text-base leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Ready to get started? Connect your wallet, explore the dashboard,
              and secure your position in the ongoing presale.
            </p>
          </div>

          <div className="mt-6 grid gap-2 sm:gap-3">
            {ctaPoints.map((point) => (
              <div key={point} className="flex items-start gap-2.5">
                <FiCheckCircle className="shrink-0 mt-0.5 text-green-500" />
                <p className={isDarkMode ? "text-gray-300 text-sm" : "text-gray-700 text-sm"}>
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/presale"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:from-green-500 hover:to-emerald-400"
            >
              Buy {TOKEN_SYMBOL}
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
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCTAComponent;
