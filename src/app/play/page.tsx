import React from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import PlayToday from "@/components/play/playToday";
import {
  mockBalance,
  mockUser,
  playToday,
  playUnfinishedQuizzes,
} from "@/lib/data/mockData";
import UnfinishedQuizzes from "@/components/play/unfinishedQuizzes";

function PlayPage() {
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
            <WelcomeHeader name={mockUser.username} />
            <BalanceCard amount={mockBalance} />
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
              <PlayToday quizzes={playToday} />
            </div>

            {/* Your Unfinished Quizzes Section */}
            <div className="space-y-4">
              <UnfinishedQuizzes quizzes={playUnfinishedQuizzes} />
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
