"use client";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import { useUser } from "@/context/userContext";

/**
 * Minimal client component: reads user context and renders the header row.
 * Keeps the main page as a server component.
 */
export default function HeaderSectionClient() {
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
