import React from "react";
import Icons from "../Global/SVG";

const TokenDocumentation = ({ isDarkMode = true }) => {
  const docs = [
    {
      title: "Abstract",
      content:
        "The AGRI Token is designed to bridge the gap between decentralized finance and sustainable agriculture. By tokenizing agricultural yield, we provide liquidity to farmers and transparent returns to investors.",
      icon: <Icons.SuccessCheckmark size={20} className="text-green-500" />,
    },
    {
      title: "Tokenomics",
      content:
        "Built on the ERC-20 standard, AGRI features a fixed supply to prevent inflation. The ICO price is dynamically managed by the contract owner via the Pricing Engine.",
      icon: <Icons.TokenIcon size={20} className="text-green-500" />,
    },
    {
      title: "Security & Audits",
      content:
        "Our smart contracts utilize OpenZeppelin's industry-standard libraries. The ICO contract includes emergency pause functionality and safe withdrawal patterns to protect treasury funds.",
      icon: <Icons.ErrorXMark size={20} className="text-green-500" />, // Using as a shield/check icon
    },
  ];

  const specs = [
    { label: "Token Name", value: "AgriToken" },
    { label: "Symbol", value: "AGT" },
    { label: "Decimals", value: "18" },
    { label: "Network", value: "Ethereum (Mainnet)" },
    { label: "Standard", value: "ERC-20" },
  ];

  return (
    <div
      className={`p-8 rounded-3xl border transition-all ${isDarkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-100"}`}
    >
      {/* HEADER */}
      <div className="mb-10">
        <h2
          className={`text-3xl font-black tracking-tighter ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Project{" "}
          <span className="text-green-500 underline decoration-green-500/20">
            Blueprint
          </span>
        </h2>
        <p className="text-gray-500 text-sm mt-2 font-medium">
          Technical documentation and token specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: NARRATIVE */}
        <div className="lg:col-span-2 space-y-6">
          {docs.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-colors group ${
                isDarkMode
                  ? "bg-gray-900/50 border-gray-800 hover:border-green-500/50"
                  : "bg-gray-50 border-gray-200 hover:border-green-500"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {item.icon}
                <h3
                  className={`font-bold uppercase tracking-widest text-xs ${isDarkMode ? "text-white" : "text-gray-800"}`}
                >
                  {item.title}
                </h3>
              </div>
              <p
                className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: QUICK SPECS */}
        <div className="space-y-6">
          <div
            className={`p-6 rounded-2xl border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-green-50 border-green-100"}`}
          >
            <h4
              className={`text-sm font-black mb-4 uppercase tracking-tighter ${isDarkMode ? "text-white" : "text-green-800"}`}
            >
              Technical Specs
            </h4>
            <div className="space-y-3">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0"
                >
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    {spec.label}
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${isDarkMode ? "text-green-400" : "text-green-700"}`}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <button
            className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-900 text-white hover:bg-black"
            }`}
          >
            <span>Download Whitepaper</span>
            <Icons.ArrowRight size={14} className="rotate-90" />
          </button>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-10 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex gap-3">
        <Icons.ErrorXMark size={18} className="text-yellow-500 shrink-0" />
        <p className="text-[10px] leading-normal text-yellow-500/80 font-medium">
          <b>Disclaimer:</b> Crypto-assets are highly volatile. Participation in
          the AGRI ICO involves significant risk. Ensure you have read the full
          technical documentation before interacting with the smart contract.
        </p>
      </div>
    </div>
  );
};

export default TokenDocumentation;
