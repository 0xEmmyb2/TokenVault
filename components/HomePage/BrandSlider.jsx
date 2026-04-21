const envBrands = process.env.NEXT_PUBLIC_BRAND_SLIDER_ITEMS;

const fallbackBrands = [
  "AgriToken",
  "DeFi Wallet",
  "Chain Analytics",
  "Farm DAO",
  "Green Finance",
  "Web3 Gateway",
  "Token Explorer",
  "Smart Yield",
];

const parseBrands = (value) => {
  if (!value || typeof value !== "string") return fallbackBrands;

  const parsed = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : fallbackBrands;
};

const BrandChip = ({ label, isDarkMode }) => (
  <div
    className={`shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
      isDarkMode
        ? "bg-gray-900/70 border-green-900/60 text-gray-200"
        : "bg-white border-green-200 text-gray-700"
    }`}
  >
    {label}
  </div>
);

const BrandSlider = ({ isDarkMode = true }) => {
  const brands = parseBrands(envBrands);
  const loopedBrands = [...brands, ...brands];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div
          className={`rounded-2xl border px-4 sm:px-6 py-6 overflow-hidden ${
            isDarkMode
              ? "bg-gray-950 border-green-900/50"
              : "bg-green-50/60 border-green-200/70"
          }`}
        >
          <p
            className={`text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Trusted Across The Ecosystem
          </p>

          <div className="mt-5 relative">
            <div
              className={`pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 z-10 ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-950 to-transparent"
                  : "bg-gradient-to-r from-green-50 to-transparent"
              }`}
            />
            <div
              className={`pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 z-10 ${
                isDarkMode
                  ? "bg-gradient-to-l from-gray-950 to-transparent"
                  : "bg-gradient-to-l from-green-50 to-transparent"
              }`}
            />

            <div className="overflow-hidden">
              <div className="flex w-max items-center gap-3 sm:gap-4 animate-brand-marquee">
                {loopedBrands.map((brand, index) => (
                  <BrandChip
                    key={`${brand}-${index}`}
                    label={brand}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes brand-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-brand-marquee {
          animation: brand-marquee 24s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default BrandSlider;
