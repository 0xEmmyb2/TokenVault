import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/HomePage/Header";
import AdminFunctions from "../components/AdminFunctions/AdminFunctions";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "AgriToken";

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem("darkMode");
      const useDark = saved === null ? true : saved === "true";
      setIsDarkMode(useDark);

      if (useDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);

    if (nextMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    try {
      localStorage.setItem("darkMode", String(nextMode));
    } catch (error) {
      // no-op: localStorage might be unavailable
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"
      }`}
    >
      <Head>
        <title>{TOKEN_NAME} Dashboard</title>
        <meta name="description" content="Admin and user contract functions dashboard" />
      </Head>

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <AdminFunctions isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}
