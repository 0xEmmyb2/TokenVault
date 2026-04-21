import Link from "next/link";
import { FiGlobe, FiShield, FiActivity, FiArrowRight } from "react-icons/fi";

const platformPillars = [
  {
    title: "Transparent By Design",
    description:
      "Every transaction is recorded on-chain, giving users verifiable data and a reliable audit trail.",
    icon: FiGlobe,
  },
  {
    title: "Security First",
    description:
      "Smart-contract powered flows reduce manual risks while preserving ownership and control of assets.",
    icon: FiShield,
  },
  {
    title: "Always Accessible",
    description:
      "A decentralized architecture keeps the platform available across regions and time zones.",
    icon: FiActivity,
  },
];

const DecentralizedPlatform = ({ isDarkMode = true }) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div
          className={`rounded-2xl border p-6 sm:p-8 lg:p-10 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-950 border-green-900/50"
              : "bg-white border-green-200/70 shadow-[0_12px_40px_rgba(0,100,0,0.06)]"
          }`}
        >
          <div className="max-w-3xl">
            <p
              className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
                isDarkMode ? "text-green-400" : "text-green-700"
              }`}
            >
              Decentralized Platform
            </p>
            <h2
              className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Build trust in modern agriculture with blockchain infrastructure.
            </h2>
            <p
              className={`mt-4 text-sm sm:text-base leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              AgriToken provides a transparent and secure foundation for tokenized
              agriculture workflows, from investment to ecosystem participation.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platformPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className={`rounded-xl border p-5 transition-all duration-200 ${
                    isDarkMode
                      ? "bg-gray-900/60 border-green-900/50 hover:border-green-700/70"
                      : "bg-green-50/50 border-green-200/70 hover:border-green-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isDarkMode
                        ? "bg-green-900/40 text-green-300"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    <Icon className="text-lg" />
                  </div>
                  <h3
                    className={`mt-4 text-base font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:from-green-500 hover:to-emerald-400"
            >
              Explore Dashboard
              <FiArrowRight />
            </Link>
            <Link
              href="/presale"
              className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                isDarkMode
                  ? "text-green-300 hover:text-green-200"
                  : "text-green-700 hover:text-green-800"
              }`}
            >
              View Presale Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecentralizedPlatform;
