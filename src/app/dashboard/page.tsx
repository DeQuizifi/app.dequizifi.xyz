"use client";

import BalanceCard from "@/components/dashboard/BalanceCard";
import InviteFriendsBanner from "@/components/dashboard/InviteFriendsBanner";
import RecentQuizWidget from "@/components/dashboard/RecentQuizWidget";
import TrendingContest from "@/components/dashboard/TrendingContest";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import { useUser } from "@/context/userContext";
import { mockRecentQuiz, type RecentQuiz } from "@/lib/data/mockData";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { username, balance } = useUser();
  const [recentQuiz, setRecentQuiz] = useState<RecentQuiz | null>(null);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setRecentQuiz(mockRecentQuiz);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen bg-background relative overflow-x-hidden"
      role="main"
      aria-label="Dashboard"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/dashboard.svg')]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 pb-safe-area-bottom">
        {/* Header Section with Welcome and Balance */}
        <div className="px-6 pt-12 pb-8">
          <div className="flex items-start justify-between gap-4">
            <WelcomeHeader name={username ?? undefined} />
            <BalanceCard amount={balance ?? 0} />
          </div>
        </div>

        {/* Recent Quiz Widget */}
        {recentQuiz && (
          <RecentQuizWidget
            progress={recentQuiz.progress}
            onClick={() => {
              // TODO: Navigate to quiz detail page
              console.log(`Navigate to quiz ${recentQuiz.id}`);
            }}
          />
        )}

        {/* Invite Friends Banner */}
        <InviteFriendsBanner
          onInvite={() => {
            // TODO: Analytics tracking for invite action
            console.log("User clicked invite friends");
          }}
          onDismiss={() => {
            // TODO: Analytics tracking for banner dismiss
            console.log("User dismissed invite banner");
          }}
        />

        <TrendingContest />
      </div>
    </main>
  );
}
