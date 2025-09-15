import LeaderboardContainer from "./LeaderboardContainer";
import LeaderboardTopBar from "./LeaderboardTopBar";

export default function LeaderboardPage() {
  // Keep this as a server component. The interactive/client logic lives in
  // `LeaderboardContainer` which is imported from the same folder.
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-[url('/images/dashboard.svg')]" />

      {/* Content Overlay */}
      <div className="relative z-10 p-6">
        {/* Header Section with Welcome and Balance (client) */}
        <LeaderboardTopBar />

        {/* Leaderboard container will handle fetching, state and interactions */}
        <LeaderboardContainer />
      </div>
    </div>
  );
}
