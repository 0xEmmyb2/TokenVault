"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminPanel } from "@/features/admin/components/AdminPanel";
// Import a loader icon (Lucide-react is great for this)
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  // Destructure isLoading here alongside your other variables
  const { isAdmin, connectedAddress, isLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    // Only attempt to redirect if we are NOT loading and NOT an admin
    // This prevents kicking you out while the blockchain is still thinking
    if (!isLoading && !isAdmin) {
      router.push("/dashboard");
    }
  }, [isAdmin, isLoading, router]);

  // 1. Handle the Loading State
  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#45ef56]" />
        <p className="text-gray-500 animate-pulse">Verifying Ownership...</p>
      </div>
    );
  }

  // 2. Security Check (Return null to show nothing if not admin)
  if (!isAdmin) return null;

  // 3. Final Admin UI
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">Owner Settings</h1>
        <p className="text-gray-400">
          Connected as:{" "}
          <span className="text-[#45ef56] font-mono text-sm">
            {connectedAddress}
          </span>
        </p>
      </div>

      <AdminPanel />
    </div>
  );
}
