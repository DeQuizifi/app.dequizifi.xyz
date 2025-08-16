import React from "react";

// Import statements will be added here as components are created:
// import ProfileWelcomeHeader from '@/components/dashboard/ProfileWelcomeHeader';
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
      <div className="relative z-10 max-w-md mx-auto space-y-6 p-4">
        {/* Header Section */}
        <div className="pt-4">
          {/* ProfileWelcomeHeader component will be imported here */}
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
