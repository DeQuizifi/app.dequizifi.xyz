import TrendingContest from "@/components/dashboard/TrendingContest";
import InviteFriendsProvider from "./InviteFriendsProvider";
import RecentQuizProvider from "./RecentQuizProvider";
import UserDataProvider from "./UserDataProvider";

export default function DashboardPage() {
  return (
    <main
      className="min-h-screen bg-background relative overflow-x-hidden"
      role="main"
      aria-label="Dashboard"
    >
      {/* Bg Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/dashboard.svg')]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 pb-safe-area-bottom">
        {/* Header Section with Welcome and Balance */}
        <div className="px-6 pt-12 pb-8">
          <UserDataProvider />
        </div>

        {/* Recent Quiz Widget */}
        <RecentQuizProvider />

        {/* Invite Friends Banner */}
        <InviteFriendsProvider />

        <TrendingContest />
      </div>
    </main>
  );
}
