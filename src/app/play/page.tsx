import PlayToday from "@/components/play/playToday";
import JoinedContests from "@/components/play/joined-contests";
import HeaderSectionClient from "./HeaderSectionClient";

function PlayPage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      role="main"
      aria-label="Play"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/dashboard.svg')]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 pb-[calc(72px+env(safe-area-inset-bottom))]">
        {/* Header Section with Welcome and Balance (client) */}
        <HeaderSectionClient />

        {/* Main Card Container for PlayToday and UnfinishedQuizzesSection */}
        <div className="bg-card rounded-t-2xl w-full mx-0 pt-6 pb-8 flex flex-col min-h-[calc(100vh-120px)] justify-between">
          <div>
            {/* What would you like to play today? Section */}
            <div className="space-y-4">
              <PlayToday />
            </div>

            {/* Your Unfinished Quizzes Section */}
            <div className="space-y-4">
              <JoinedContests />
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
