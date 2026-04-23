import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/HomePage/Header";
import HeroSection from "../components/HomePage/HeroSection";
import HeroCTAComponent from "../components/HomePage/HeroCTAComponent";
import DecentralizedPlatform from "../components/HomePage/DecentralizedPlatform";
import BlockchainFeatures from "../components/HomePage/BlockchainFeatures";
import VideoCardSlider from "../components/HomePage/VideoCardSlider";
import TokenomicsComponent from "../components/HomePage/TokenomicsComponent";
import RoadmapComponent from "../components/HomePage/RoadmapComponent";
import BrandSlider from "../components/HomePage/BrandSlider";
import TestimonialSlider from "../components/HomePage/TestimonialSlider";
import FAQComponent from "../components/HomePage/FAQComponent";
import FooterComponent from "../components/HomePage/FooterComponent";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME;


export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saveMode = localStorage.getItem("darkMode");

      const shouldUseDarkMode =
        saveMode === null ? true : saveMode === "true";

      setIsDarkMode(shouldUseDarkMode);

      if (shouldUseDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error initializing theme", error);
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);

    try {
      localStorage.setItem("darkMode", newMode.toString());
    } catch (error) {
      console.error("Error saving theme preference", error);
    }
  };

  const applyTheme = (dark) => {
    if (typeof document === "undefined") return;

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"} transition-colors duration-300`}
    >
      <Head>
        <title>{TOKEN_NAME} Handler</title>
        <meta name="description" content="AGRITOKEN dApp" />
        <link rel="icon" href="./logo.png" />
      </Head>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        <HeroSection isDarkMode={isDarkMode} />
        <HeroCTAComponent isDarkMode={isDarkMode} />
        <DecentralizedPlatform isDarkMode={isDarkMode} />
        <BlockchainFeatures isDarkMode={isDarkMode} />
        <VideoCardSlider isDarkMode={isDarkMode} />
        <TokenomicsComponent isDarkMode={isDarkMode} />
        <RoadmapComponent isDarkMode={isDarkMode} />
        <BrandSlider isDarkMode={isDarkMode} />
        <TestimonialSlider isDarkMode={isDarkMode} />
        <FAQComponent isDarkMode={isDarkMode} />
      </main>
      <FooterComponent isDarkMode={isDarkMode} />
    </div>
  );
}
