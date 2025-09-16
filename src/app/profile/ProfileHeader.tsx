"use client";

import BalanceCard from "@/components/dashboard/BalanceCard";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import { useUser } from "@/context/userContext";

export default function ProfileHeader() {
  const { username, balance, address } = useUser();

  return (
    <div className="flex items-center space-x-2 gap-4">
      <WelcomeHeader name={username || "User"} address={address ?? ""} />
      <BalanceCard amount={balance ?? 0} />
    </div>
  );
}
