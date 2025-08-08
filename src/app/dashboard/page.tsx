"use client";

import { useEffect, useState } from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import RecentQuizWidget from "@/components/dashboard/RecentQuizWidget";
import InviteFriendsBanner from "@/components/dashboard/InviteFriendsBanner";

// Mock data for now - later will be replaced with actual API calls
const mockUser = {
  username: "CryptoEnthusiast",
};

const mockBalance = 60.25;

const mockRecentQuiz = {
  id: "1",
  title: "Know Your Crypto Lingo",
  progress: 69,
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [balance, setBalance] = useState(0);
  const [recentQuiz, setRecentQuiz] = useState<{
    id: string;
    title: string;
    progress: number;
  } | null>(null);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser(mockUser);
      setBalance(mockBalance);
      setRecentQuiz(mockRecentQuiz);
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
          backgroundImage: `url('/images/dashboard.svg')`,
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

        {/* Recent Quiz Widget */}
        {recentQuiz && (
          <RecentQuizWidget
            title={recentQuiz.title}
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
      </div>
    </main>
  );
}
