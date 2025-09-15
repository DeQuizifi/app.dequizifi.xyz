"use client";

import BalanceCard from "@/components/dashboard/BalanceCard";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import { useUser } from "@/context/userContext";

interface UserDataProviderProps {
  className?: string;
}

export default function UserDataProvider({ className }: UserDataProviderProps) {
  const { username, balance } = useUser();

  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-4">
        <WelcomeHeader name={username ?? undefined} />
        <BalanceCard amount={balance ?? 0} />
      </div>
    </div>
  );
}
