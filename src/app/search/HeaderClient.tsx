"use client";
import React from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import { useUser } from "@/context/userContext";

export default function HeaderClient() {
  const { username, balance } = useUser();
  return (
    <div className="px-6 pt-12 pb-8">
      <div className="flex items-start justify-between gap-4">
        <WelcomeHeader name={username ?? undefined} />
        <BalanceCard amount={balance ?? 0} />
      </div>
    </div>
  );
}
