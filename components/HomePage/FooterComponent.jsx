import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Footer from "./Footer";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "AgriToken";
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "AGRI";

const FooterComponent = ({ isDarkMode = true }) => {
  return (
    <section>
      <div className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto">
          <div
            className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${
              isDarkMode
                ? "bg-gradient-to-r from-green-950/40 via-gray-950 to-green-950/40 border-green-900/50"
                : "bg-gradient-to-r from-green-50 via-white to-green-50 border-green-200/70 shadow-[0_16px_40px_rgba(0,100,0,0.08)]"
            }`}
          >
            <div className="max-w-3xl">
              <p
                className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
                  isDarkMode ? "text-green-400" : "text-green-700"
                }`}
              >
                Ready To Start
              </p>
              <h2
                className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Join {TOKEN_NAME} and unlock the utility of {TOKEN_SYMBOL} in a
                transparent blockchain ecosystem.
              </h2>
              <p
                className={`mt-4 text-sm sm:text-base leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Explore the dashboard, track activity on-chain, and participate
                confidently in the ecosystem.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/presale"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:from-green-500 hover:to-emerald-400"
              >
                Go To Presale
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

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/dashboard"
                className={`text-xs sm:text-sm ${
                  isDarkMode
                    ? "text-gray-400 hover:text-green-300"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/dashboard"
                className={`text-xs sm:text-sm ${
                  isDarkMode
                    ? "text-gray-400 hover:text-green-300"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                Terms of Use
              </Link>
              <Link
                href="/dashboard"
                className={`text-xs sm:text-sm ${
                  isDarkMode
                    ? "text-gray-400 hover:text-green-300"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </section>
  );
};

export default FooterComponent;
