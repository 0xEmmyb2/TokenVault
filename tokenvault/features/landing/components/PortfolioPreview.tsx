const TOP_ASSETS = [
  {
    name: "Ethereum",
    symbol: "ETH",
    apr: "13.62%",
    flow: "+6.25%",
    color: "#9ea7ff",
  },
  {
    name: "BNB Chain",
    symbol: "BNB",
    apr: "12.72%",
    flow: "+5.67%",
    color: "#ffd45e",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    apr: "6.29%",
    flow: "-1.89%",
    color: "#bb86ff",
  },
];

export const PortfolioPreview = () => {
  return (
    <section id="markets" className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[32px] border border-white/10 bg-[#0e1220]/88 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.32)]">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/38">
              Recommended markets
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">
              Top staking assets
            </h2>
          </div>
          <div className="flex gap-2 text-xs text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              24H
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Proof of Stake
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Sorted by APR
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {TOP_ASSETS.map((asset, index) => (
            <article
              key={asset.symbol}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold text-[#080912]"
                    style={{ backgroundColor: asset.color }}
                  >
                    {asset.symbol.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      Proof of Stake
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {asset.name} ({asset.symbol})
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-xs text-white/42">Reward rate</p>
                <p className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-white">
                  {asset.apr}
                </p>
                <p
                  className={`mt-2 text-sm ${asset.flow.startsWith("+") ? "text-[#81ffe0]" : "text-[#ff8b9c]"}`}
                >
                  {asset.flow} market momentum
                </p>
              </div>

              <div className="mt-5 h-20 overflow-hidden rounded-[20px] border border-white/6 bg-black/20 p-2">
                <svg viewBox="0 0 280 90" className="h-full w-full">
                  <path
                    d={
                      index === 0
                        ? "M0 70 C30 82, 50 22, 90 38 S150 85, 185 46 S228 10, 280 34"
                        : index === 1
                          ? "M0 66 C34 78, 59 88, 92 58 S158 12, 203 36 S238 72, 280 42"
                          : "M0 44 C40 12, 72 20, 102 40 S148 71, 191 57 S240 34, 280 58"
                    }
                    fill="none"
                    stroke={asset.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(26,18,47,0.92),rgba(103,87,198,0.9))] p-6 shadow-[0_25px_90px_rgba(57,33,113,0.42)]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/90">Staking cockpit</p>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
            New
          </span>
        </div>

        <h3 className="mt-8 max-w-xs text-4xl font-semibold leading-tight tracking-[-0.05em] text-white">
          Launch with a premium wallet-first portfolio experience.
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
          Present token utility, active staking flows, and treasury-grade
          analytics in a frontend that already feels investor ready.
        </p>

        <div className="mt-10 space-y-3">
          <button className="w-full rounded-2xl bg-white px-5 py-4 text-sm font-medium text-[#1c1534] transition hover:bg-white/90">
            Connect with wallet
          </button>
          <button className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-medium text-white transition hover:bg-white/15">
            Enter a wallet address
          </button>
        </div>

        <div className="mt-10 rounded-[28px] border border-white/15 bg-black/15 p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                Suggested position
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                4 months
              </p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              Flexible term
            </span>
          </div>

          <div className="mt-6 h-2 rounded-full bg-white/10">
            <div className="h-2 w-2/3 rounded-full bg-[linear-gradient(90deg,#c7b6ff,#ffffff)] shadow-[0_0_24px_rgba(199,182,255,0.55)]" />
          </div>

          <div className="mt-4 flex justify-between text-xs text-white/50">
            <span>1 month</span>
            <span>4 months</span>
            <span>6 months</span>
          </div>
        </div>
      </aside>
    </section>
  );
};
