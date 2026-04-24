"use client";

import { Copy, Database, Radio, Webhook } from "lucide-react";

const ENDPOINTS = [
  { method: "GET", path: "/api/v1/rates", desc: "Fetch live staking rates by asset and provider." },
  { method: "GET", path: "/api/v1/tvl", desc: "Read total value locked across the vault contract." },
  { method: "POST", path: "/api/v1/webhooks/whales", desc: "Receive whale staking alerts in real time." },
];

export default function DataApiPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
          Developer layer
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
          Data API
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
          Expose protocol data for power users, dashboards, and external apps.
          This is the bridge from your on-chain vault to Web2.5 integrations.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <InfoCard
            icon={<Database className="h-5 w-5 text-[#d7ccff]" />}
            title="Documentation"
            description="Explain authentication, base URLs, response schema, and rate limits for every endpoint."
          />
          <InfoCard
            icon={<Webhook className="h-5 w-5 text-[#8effdd]" />}
            title="Webhooks"
            description="Alert external systems whenever a whale enters the platform or TVL crosses a major threshold."
          />
          <InfoCard
            icon={<Radio className="h-5 w-5 text-[#ffcc85]" />}
            title="On-chain stats"
            description="Publish live TVL, provider utilization, and asset distribution without hiding the raw data."
          />
        </div>

        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-white">API endpoints</p>
              <p className="mt-1 text-sm text-white/45">
                Ready for SDK docs, dashboard embeds, and integrations.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition hover:bg-white/10">
              <Copy className="h-4 w-4" />
              Copy API Key
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {ENDPOINTS.map((endpoint) => (
              <div
                key={endpoint.path}
                className="rounded-[24px] border border-white/8 bg-[#101425] p-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#d7ccff] px-3 py-1 text-xs font-medium text-[#120f26]">
                    {endpoint.method}
                  </span>
                  <code className="text-sm text-white">{endpoint.path}</code>
                </div>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  {endpoint.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[26px] border border-white/8 bg-[#0d111f] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">
              Example response
            </p>
            <pre className="mt-4 overflow-x-auto text-sm leading-6 text-[#cfd4ff]">
{`{
  "asset": "ETH",
  "bestProvider": "Lido Prime",
  "apy": 0.1272,
  "tvl": 8420000,
  "updatedAt": "2026-04-24T16:00:00Z"
}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,34,0.98),rgba(12,14,24,0.94))] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5">
        {icon}
      </div>
      <p className="mt-4 text-lg font-medium text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
    </div>
  );
}
