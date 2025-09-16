"use client";

import BalanceCard from "@/components/dashboard/BalanceCard";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import { useUser } from "@/context/userContext";

export default function ProfileHeader() {
  const user = useUser();
  const username = user?.username ?? "User";
  const balance = user?.balance ?? 0;
  const address = user?.address ?? "";

  return (
    <div className="flex items-center space-x-2 gap-4">
      <WelcomeHeader name={username} address={address} />
      <BalanceCard amount={balance} />
    </div>
  );
}
