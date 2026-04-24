import { ArrowUpRight, TrendingUp } from "lucide-react";

const ASSETS = [
  {
    name: "Ethereum",
    symbol: "ETH",
    rate: "13.62%",
    color: "#9da8ff",
    trend: "+ 6.25%",
    trendPositive: true,
    path: "M0 67 C28 79, 48 24, 86 39 S151 92, 188 62 S230 18, 278 35",
  },
  {
    name: "BNB Chain",
    symbol: "BNB",
    rate: "12.72%",
    color: "#ffd24d",
    trend: "+ 5.67%",
    trendPositive: true,
    path: "M0 64 C34 84, 52 90, 90 58 S152 16, 197 38 S241 80, 278 49",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    rate: "6.29%",
    color: "#b07bff",
    trend: "- 1.89%",
    trendPositive: false,
    path: "M0 33 C38 11, 72 20, 104 42 S154 72, 192 61 S238 31, 278 55",
  },
];

export const AssetGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      {ASSETS.map((asset) => (
        <article
          key={asset.symbol}
          className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,20,34,0.96),rgba(12,14,24,0.92))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(174,138,255,0.12),transparent_35%)] opacity-0 transition duration-300 group-hover:opacity-100" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold text-[#0b0d16]"
                style={{ backgroundColor: asset.color }}
              >
                {asset.symbol.slice(0, 1)}
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Proof of Stake
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {asset.name} ({asset.symbol})
                </p>
              </div>
            </div>

            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative mt-8">
            <p className="text-[11px] font-medium text-white/35">Reward Rate</p>
            <div className="mt-2 flex items-end gap-3">
              <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
                {asset.rate}
              </p>
              <div
                className={`mb-1 flex items-center gap-1 text-[11px] font-semibold ${asset.trendPositive ? "text-[#81ffe0]" : "text-[#ff8ca0]"}`}
              >
                <TrendingUp className="h-3 w-3" />
                {asset.trend}
              </div>
            </div>
          </div>

          <div className="relative mt-6 h-24 overflow-hidden rounded-[22px] border border-white/6 bg-black/15 p-3">
            <div
              className="absolute inset-x-5 bottom-4 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              }}
            />
            <svg viewBox="0 0 278 88" className="h-full w-full">
              <defs>
                <linearGradient
                  id={`asset-gradient-${asset.symbol}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={asset.color} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={asset.color} stopOpacity="0.75" />
                </linearGradient>
              </defs>
              <path
                d={asset.path}
                fill="none"
                stroke={`url(#asset-gradient-${asset.symbol})`}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </article>
      ))}
    </div>
  );
};
