"use client";

import React from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import { useUser } from "@/context/userContext";

export default function LeaderboardTopBar() {
  const { username, balance } = useUser();

  return (
    <div className="flex items-start justify-between mb-8">
      <WelcomeHeader name={username ?? undefined} />
      <BalanceCard amount={balance ?? 0} />
    </div>
  );
}
