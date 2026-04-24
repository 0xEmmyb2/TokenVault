const STATS = [
  { value: "$8.42M", label: "Projected value routed through vault strategies" },
  { value: "27", label: "Supported ERC20 assets and staking pathways" },
  { value: "99.95%", label: "Operational uptime for portfolio actions" },
  { value: "<4 min", label: "Average wallet-to-position activation time" },
];

export const StatsBar = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[28px] border border-white/10 bg-white/[0.04] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          <p className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">
            {stat.value}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
};
