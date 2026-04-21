import React from "react";
import Link from "next/link";
import { useWeb3 } from "../../context/Web3Provider";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiDollarSign,
  FiFileText,
  FiShoppingCart,
  FiArrowUpRight,
  FiBarChart3,
  FiShield,
} from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isAdmin, isConnected } = useWeb3();

  const adminMenuItems = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Purchase History", href: "/transaction", icon: FiFileText },
    { name: "Token Calculator", href: "/token-calculator", icon: FiDollarSign },
    { name: "Admin Overview", href: "/admin-overview", icon: FiBarChart3 },
    { name: "Admin Functions", href: "/admin-functions", icon: FiSettings },
  ];

  const userMenuItems = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Purchase History", href: "/transaction", icon: FiFileText },
    { name: "Token Calculator", href: "/token-calculator", icon: FiDollarSign },
    { name: "Token Sale", href: "/token-sale", icon: FiShoppingCart },
    { name: "Token Transfer", href: "/token-transfer", icon: FiArrowUpRight },
    { name: "Withdraw Tokens", href: "/withdraw-tokens", icon: FiUser },
    {
      name: "Token Documentation",
      href: "/token-documentation",
      icon: FiFileText,
    },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {isAdmin ? "Admin Panel" : "User Panel"}
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <FiSettings className="w-5 h-5" />
        </button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                onClick={toggleSidebar}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {!isConnected && (
        <div className="mt-8 px-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Connect your wallet to access features
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
