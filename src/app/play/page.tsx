"use client";
import React from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import PlayToday from "@/components/play/playToday";
import { useUser } from "@/context/userContext";
import JoinedContests from "@/components/play/joined-contests";

function PlayPage() {
  const { username, balance } = useUser();
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      role="main"
      aria-label="Play"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/dashboard.svg')` }}
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

        {/* Main Card Container for PlayToday and UnfinishedQuizzesSection */}
        <div
          className="bg-card rounded-t-2xl w-full mx-0 pt-6 pb-8 flex flex-col min-h-[calc(100vh-120px)] justify-between shadow-none border-0 outline-none"
          style={{ boxShadow: "none", border: "none", outline: "none" }}
        >
          <div>
            {/* What would you like to play today? Section */}
            <div className="space-y-4">
              <PlayToday/>
            </div>

            {/* Your Unfinished Quizzes Section */}
            <div className="space-y-4">
              <JoinedContests/>
            </div>
          </div>
          {/* This empty div ensures the container stretches to the bottom */}
          <div></div>
        </div>
      </div>
    </main>
  );
}

export default PlayPage;
