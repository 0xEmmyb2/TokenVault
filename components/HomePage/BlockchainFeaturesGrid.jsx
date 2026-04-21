import {
  FiShield,
  FiTrendingUp,
  FiClock,
  FiUsers,
  FiDatabase,
  FiCpu,
} from "react-icons/fi";

const defaultFeatures = [
  {
    title: "On-Chain Transparency",
    description:
      "Track token movement and ecosystem activity with verifiable public records.",
    icon: FiDatabase,
  },
  {
    title: "Secure Architecture",
    description:
      "Built with smart-contract logic designed to minimize trust assumptions.",
    icon: FiShield,
  },
  {
    title: "Fast Settlement",
    description:
      "Blockchain-based workflows reduce friction and speed up confirmations.",
    icon: FiClock,
  },
  {
    title: "Scalable Growth",
    description:
      "A modular foundation that supports ecosystem expansion over time.",
    icon: FiTrendingUp,
  },
  {
    title: "Community Participation",
    description:
      "Decentralized participation gives contributors a stronger voice in growth.",
    icon: FiUsers,
  },
  {
    title: "Composable Integrations",
    description:
      "Designed to connect with wallets, dashboards, and analytics tools.",
    icon: FiCpu,
  },
];

const BlockchainFeaturesGrid = ({ isDarkMode = true, features = defaultFeatures }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <article
            key={feature.title}
            className={`rounded-xl border p-5 transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-900/60 border-green-900/50 hover:border-green-700/70"
                : "bg-white border-green-200/70 hover:border-green-300 shadow-[0_8px_24px_rgba(0,100,0,0.05)]"
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
              {feature.title}
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {feature.description}
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default BlockchainFeaturesGrid;
