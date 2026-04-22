import React, { useState, useEffect } from "react";
import Head from "next/head";
// import Navbar from "../components/HomePage/Navbar";
// import Services from "../components/Landing/Services";
// import Portfolio from "../components/HomePage/Portfolio";
// import Team from "../components/HomePage/Team";
import Roadmap from "../components/HomePage/RoadmapComponent";
import Footer from "../components/HomePage/Footer";

import Sidebar from "../components/Global/Sidebar";
import UserDashboard from "../components/UserDashboard/UserDashboard";
import { useWeb3 } from "../context/Web3Provider";
import FAQComponent from "../components/HomePage/FAQComponent";
import HeroSection from "../components/HomePage/HeroSection";
import RoadmapComponent from "../components/HomePage/RoadmapComponent";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isConnected, isAdmin } = useWeb3();

  useEffect(() => setMounted(true), []);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  if (!mounted) return null;

  // --- DISCONNECTED VIEW (Landing Page) ---
  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-[#050505] scroll-smooth">
        <Head>
          <title>AgriToken | Sustainable Future</title>
        </Head>
        <main>
          <HeroSection />
          <RoadmapComponent />
          <FAQComponent />
        </main>
        <Footer />
      </div>
    );
  }

  // --- CONNECTED VIEW (Dashboard) ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`transition-all duration-300 ${isSidebarOpen ? "pl-64" : "pl-0"}`}
      >
        {/* Your existing Header and UserDashboard logic goes here */}
        <UserDashboard isDarkMode={true} />
      </main>
    </div>
  );
}
