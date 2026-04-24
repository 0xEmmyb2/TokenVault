import {
  Blocks,
  DatabaseZap,
  Gauge,
  ShieldCheck,
  Split,
  Wallet,
} from "lucide-react";

const FEATURES = [
  {
    title: "Smart vault orchestration",
    description:
      "Coordinate ERC20 deposits, rewards, and position lifecycle from one operational surface.",
    icon: Split,
  },
  {
    title: "Wallet-first onboarding",
    description:
      "Make connection, authorization, and deposit flows feel native to serious DeFi users.",
    icon: Wallet,
  },
  {
    title: "Performance visibility",
    description:
      "Track APR movement, value routed, and market participation through clean analytics blocks.",
    icon: Gauge,
  },
  {
    title: "Provider abstraction",
    description:
      "Support multiple staking engines or treasury strategies without fragmenting the frontend.",
    icon: Blocks,
  },
  {
    title: "Contract-aware controls",
    description:
      "Highlight token allowances, vault state, and action readiness before the user signs.",
    icon: DatabaseZap,
  },
  {
    title: "Trust layer messaging",
    description:
      "Expose your security posture, audit readiness, and role separation directly in the UI.",
    icon: ShieldCheck,
  },
];

export const FeatureGrid = () => {
  return (
    <section id="features" className="space-y-6 pb-12">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#ddd2ff]">
          Product strengths
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl">
          Built for projects that need more than a generic token dashboard.
        </h2>
        <p className="mt-4 text-base leading-7 text-white/60">
          The landing experience should signal confidence immediately: premium
          presentation, clear token utility, and a front-end that makes complex
          ERC20 handling approachable.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c2b2ff]/12 text-[#d8d0ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-xl font-medium tracking-[-0.03em] text-white">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/58">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
