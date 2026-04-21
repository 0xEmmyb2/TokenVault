import BlockchainFeaturesGrid from "./BlockchainFeaturesGrid";

const BlockchainFeatures = ({ isDarkMode = true }) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p
            className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Blockchain Features
          </p>
          <h2
            className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Core capabilities built for trust, speed, and ecosystem growth.
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The AgriToken blockchain stack combines transparency, security, and
            usability so users can engage confidently with decentralized products.
          </p>
        </div>

        <div className="mt-8">
          <BlockchainFeaturesGrid isDarkMode={isDarkMode} />
        </div>
      </div>
    </section>
  );
};

export default BlockchainFeatures;
