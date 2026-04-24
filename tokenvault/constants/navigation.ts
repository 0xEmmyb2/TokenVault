import {
  LayoutGrid,
  Wallet,
  History,
  Settings,
  ShieldCheck,
  PieChart,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "My Assets", href: "/dashboard/assets", icon: Wallet },
  { label: "Transaction History", href: "/dashboard/history", icon: History },
  { label: "Analytics", href: "/dashboard/stats", icon: PieChart },
];
