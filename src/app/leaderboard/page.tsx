"use client";

import React from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/dashboard.svg')",
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 p-6">
        {/* Header Section with Welcome and Balance */}
        <div className="flex items-start justify-between mb-8">
          <WelcomeHeader name="Arion Loveless" />
          <BalanceCard amount={602} />
        </div>

        {/* Leaderboard Content Area */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-h-[600px]">
          <h2 className="text-white text-2xl font-bold mb-6">Leaderboard</h2>

          {/* Placeholder for leaderboard content */}
        </div>
      </div>
    </div>
  );
}
