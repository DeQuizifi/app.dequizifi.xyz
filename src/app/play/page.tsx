import React from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import { mockBalance, mockUser } from "@/lib/data/mockData";

// Import statements will be added here as components are created:
// import PlayTodaySection from '@/components/play/PlayTodaySection';
// import UnfinishedQuizzesSection from '@/components/play/UnfinishedQuizzesSection';

function PlayPage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      role="main"
      aria-label="Play"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
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

        {/* What would you like to play today? Section */}
        <div className="space-y-4">
          {/* PlayTodaySection component will be imported here */}
        </div>

        {/* Your Unfinished Quizzes Section */}
        <div className="space-y-4">
          {/* UnfinishedQuizzesSection component will be imported here */}
        </div>
      </div>
    </main>
  );
}

export default PlayPage;
