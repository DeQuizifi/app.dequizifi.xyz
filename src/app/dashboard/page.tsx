"use client";

import { useEffect, useState } from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";

// Mock data for now - later will be replaced with actual API calls
const mockUser = {
  username: "Arion Loveless",
};

const mockBalance = 60.25;

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser(mockUser);
      setBalance(mockBalance);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen bg-gray-50 relative overflow-x-hidden"
      role="main"
      aria-label="Dashboard"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/login-bg.svg')`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 pb-safe-area-bottom">
        {/* Header Section with Welcome and Balance */}
        <div className="px-6 pt-12 pb-8">
          <div className="flex items-start justify-between gap-4">
            <WelcomeHeader name={user?.username} />
            <BalanceCard amount={balance} />
          </div>
        </div>
      </div>
    </main>
  );
}
