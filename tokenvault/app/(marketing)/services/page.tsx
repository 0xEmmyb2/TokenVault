import { Card } from "@/components/ui/Card";

export default function ServicesPage() {
  const services = [
    { title: "Token Staking", desc: "High yield vaults for ERC20." },
    { title: "Security Audit", desc: "Real-time monitoring of assets." },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-12">Our <span className="text-purple-500">Services</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s) => (
          <Card key={s.title}>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-gray-400">{s.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}