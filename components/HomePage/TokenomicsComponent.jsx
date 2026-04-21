const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "AgriToken";
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "AGRI";
const TOTAL_SUPPLY = process.env.NEXT_PUBLIC_TOKEN_SUPPLY || "1,000,000,000";
const TOKEN_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE || "0.0035";
const NETWORK = process.env.NEXT_PUBLIC_BLOCKCHAIN || "Blockchain";

const allocation = [
  { label: "Presale", value: 35, color: "bg-emerald-500" },
  { label: "Liquidity", value: 20, color: "bg-green-500" },
  { label: "Ecosystem Growth", value: 18, color: "bg-lime-500" },
  { label: "Team & Advisors", value: 12, color: "bg-teal-500" },
  { label: "Marketing", value: 10, color: "bg-cyan-500" },
  { label: "Reserve", value: 5, color: "bg-sky-500" },
];

const tokenStats = [
  { label: "Token Name", value: TOKEN_NAME },
  { label: "Ticker", value: TOKEN_SYMBOL },
  { label: "Total Supply", value: TOTAL_SUPPLY },
  { label: "Network", value: NETWORK },
  { label: "Presale Price", value: `$${TOKEN_PRICE}` },
  { label: "Type", value: "Utility Token" },
];

const TokenomicsComponent = ({ isDarkMode = true }) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p
            className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Tokenomics
          </p>
          <h2
            className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            A sustainable token model designed for long-term ecosystem growth.
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {TOKEN_SYMBOL} is structured to support community participation,
            liquidity stability, and strategic expansion over time.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div
            className={`lg:col-span-3 rounded-2xl border p-5 sm:p-6 ${
              isDarkMode
                ? "bg-gray-900/60 border-green-900/50"
                : "bg-white border-green-200/70 shadow-[0_10px_28px_rgba(0,100,0,0.06)]"
            }`}
          >
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Allocation Breakdown
            </h3>

            <div
              className={`mt-4 h-4 w-full overflow-hidden rounded-full ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <div className="flex h-full w-full">
                {allocation.map((item) => (
                  <span
                    key={item.label}
                    className={`${item.color} h-full`}
                    style={{ width: `${item.value}%` }}
                    title={`${item.label}: ${item.value}%`}
                  />
                ))}
              </div>
            </div>

            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {allocation.map((item) => (
                <li
                  key={item.label}
                  className={`rounded-lg border px-3 py-2.5 flex items-center justify-between ${
                    isDarkMode
                      ? "bg-gray-950/60 border-green-900/40"
                      : "bg-green-50/60 border-green-200/70"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className={isDarkMode ? "text-sm text-gray-300" : "text-sm text-gray-700"}>
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`lg:col-span-2 rounded-2xl border p-5 sm:p-6 ${
              isDarkMode
                ? "bg-gray-900/60 border-green-900/50"
                : "bg-white border-green-200/70 shadow-[0_10px_28px_rgba(0,100,0,0.06)]"
            }`}
          >
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Token Details
            </h3>

            <div className="mt-4 space-y-2.5">
              {tokenStats.map((row) => (
                <div
                  key={row.label}
                  className={`rounded-lg border px-3 py-2.5 flex items-center justify-between gap-3 ${
                    isDarkMode
                      ? "bg-gray-950/60 border-green-900/40"
                      : "bg-green-50/60 border-green-200/70"
                  }`}
                >
                  <span className={isDarkMode ? "text-xs text-gray-400" : "text-xs text-gray-500"}>
                    {row.label}
                  </span>
                  <span
                    className={`text-sm font-semibold text-right ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsComponent;
