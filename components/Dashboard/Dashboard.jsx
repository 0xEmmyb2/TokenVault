import React, { useState } from "react";
import AdminOverview from "../AdminOverview/AdminOverview";
import Icons from "../Global/SVG";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: "overview", label: "Overview", icon: <Icons.Dashboard size={20} /> },
    {
      id: "tokens",
      label: "Token Manager",
      icon: <Icons.TokenIcon size={20} />,
    },
    { id: "history", label: "Sale History", icon: <Icons.History size={20} /> },
    { id: "settings", label: "Settings", icon: <Icons.Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-gray-400 font-sans">
      {/* SIDEBAR */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 border-r border-gray-800/50 bg-[#080808] flex flex-col`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex-shrink-0 flex items-center justify-center text-black">
            <Icons.TokenIcon size={20} />
          </div>
          {isSidebarOpen && (
            <span className="font-black text-white tracking-tighter text-xl">
              AGRI<span className="text-green-500">DASH</span>
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-green-500/10 text-green-500 shadow-[inset_0_0_10px_rgba(34,197,94,0.1)]"
                  : "hover:bg-gray-800/50 hover:text-white"
              }`}
            >
              {item.icon}
              {isSidebarOpen && (
                <span className="text-sm font-bold tracking-tight">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800/50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full py-2 flex items-center justify-center hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Icons.ArrowRight
              className={`transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="h-16 border-b border-gray-800/50 flex items-center justify-between px-8 bg-[#080808]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span>Console</span>
            <Icons.ChevronRight size={12} />
            <span className="text-green-500">{activeTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-green-500 uppercase">
                Mainnet Node Active
              </span>
            </div>
          </div>
        </header>

        {/* DYNAMIC VIEWPORT */}
        <section className="p-8 max-w-7xl mx-auto w-full">
          {activeTab === "overview" && <AdminOverview isDarkMode={true} />}

          {activeTab === "tokens" && (
            <div className="p-12 text-center border-2 border-dashed border-gray-800 rounded-3xl">
              <Icons.TokenIcon
                size={48}
                className="mx-auto mb-4 text-gray-700"
              />
              <h3 className="text-white font-bold text-lg">Token Management</h3>
              <p className="text-gray-500 text-sm">
                Deployment and Minting controls coming soon.
              </p>
            </div>
          )}

          {activeTab === "history" && (
            <div className="p-12 text-center border-2 border-dashed border-gray-800 rounded-3xl">
              <Icons.History size={48} className="mx-auto mb-4 text-gray-700" />
              <h3 className="text-white font-bold text-lg">
                Detailed Audit Logs
              </h3>
              <p className="text-gray-500 text-sm">
                Full transaction history export available in next build.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-12 text-center border-2 border-dashed border-gray-800 rounded-3xl">
              <Icons.Settings
                size={48}
                className="mx-auto mb-4 text-gray-700"
              />
              <h3 className="text-white font-bold text-lg">Admin Settings</h3>
              <p className="text-gray-500 text-sm">
                Multi-sig wallet configuration and API keys.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
