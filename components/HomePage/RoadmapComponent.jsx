import { FiCheckCircle, FiClock, FiRadio } from "react-icons/fi";

const envRoadmap = process.env.NEXT_PUBLIC_ROADMAP_ITEMS;

const fallbackRoadmap = [
  {
    phase: "Phase 1",
    period: "Q1 2026",
    title: "Foundation & Presale Launch",
    status: "completed",
    items: [
      "Token contract deployment",
      "Presale dashboard release",
      "Core documentation publication",
    ],
  },
  {
    phase: "Phase 2",
    period: "Q2 2026",
    title: "Ecosystem Expansion",
    status: "in-progress",
    items: [
      "Referral and community programs",
      "Explorer and analytics upgrades",
      "Partnership onboarding",
    ],
  },
  {
    phase: "Phase 3",
    period: "Q3 2026",
    title: "Utility & Integrations",
    status: "upcoming",
    items: [
      "Advanced wallet integrations",
      "Cross-platform utility features",
      "API access for ecosystem builders",
    ],
  },
  {
    phase: "Phase 4",
    period: "Q4 2026",
    title: "Global Scale",
    status: "upcoming",
    items: [
      "Regional expansion campaigns",
      "Expanded governance participation",
      "Long-term sustainability initiatives",
    ],
  },
];

const parseRoadmap = (value) => {
  if (!value || typeof value !== "string") return fallbackRoadmap;

  try {
    const parsed = JSON.parse(value);
    const cleaned = Array.isArray(parsed)
      ? parsed.filter(
          (item) =>
            item &&
            typeof item.phase === "string" &&
            typeof item.period === "string" &&
            typeof item.title === "string" &&
            typeof item.status === "string" &&
            Array.isArray(item.items),
        )
      : [];

    return cleaned.length > 0 ? cleaned : fallbackRoadmap;
  } catch (error) {
    return fallbackRoadmap;
  }
};

const statusConfig = {
  completed: {
    label: "Completed",
    icon: FiCheckCircle,
    darkClass: "bg-emerald-900/40 text-emerald-300 border-emerald-800/60",
    lightClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  "in-progress": {
    label: "In Progress",
    icon: FiClock,
    darkClass: "bg-amber-900/40 text-amber-300 border-amber-800/60",
    lightClass: "bg-amber-100 text-amber-700 border-amber-200",
  },
  upcoming: {
    label: "Upcoming",
    icon: FiRadio,
    darkClass: "bg-sky-900/40 text-sky-300 border-sky-800/60",
    lightClass: "bg-sky-100 text-sky-700 border-sky-200",
  },
};

const RoadmapComponent = ({ isDarkMode = true }) => {
  const roadmap = parseRoadmap(envRoadmap);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p
            className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Product Roadmap
          </p>
          <h2
            className={`mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Milestones guiding the growth of the AgriToken ecosystem.
          </h2>
          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            A transparent view of what has shipped, what is currently in progress,
            and what comes next.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {roadmap.map((phaseItem) => {
            const status = statusConfig[phaseItem.status] || statusConfig.upcoming;
            const StatusIcon = status.icon;

            return (
              <article
                key={`${phaseItem.phase}-${phaseItem.period}`}
                className={`rounded-xl border p-5 sm:p-6 ${
                  isDarkMode
                    ? "bg-gray-900/60 border-green-900/50"
                    : "bg-white border-green-200/70 shadow-[0_8px_24px_rgba(0,100,0,0.05)]"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 justify-between">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {phaseItem.phase} • {phaseItem.period}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      isDarkMode ? status.darkClass : status.lightClass
                    }`}
                  >
                    <StatusIcon className="text-sm" />
                    {status.label}
                  </span>
                </div>

                <h3
                  className={`mt-3 text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {phaseItem.title}
                </h3>

                <ul className="mt-4 space-y-2">
                  {phaseItem.items.map((task) => (
                    <li key={task} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                      <span className={isDarkMode ? "text-sm text-gray-300" : "text-sm text-gray-600"}>
                        {task}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapComponent;
