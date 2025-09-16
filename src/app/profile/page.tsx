import OverallStatistics from "@/components/profile/OverallStatistics";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

export default function ProfilePage() {
  return (
    <main
      className="min-h-screen bg-background relative overflow-hidden"
      role="main"
      aria-label="Profile"
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
          <ProfileHeader />
          <OverallStatistics />
        </div>

        {/* Tabs Section */}
        <div className="px-6">
          <ProfileTabs />
        </div>
      </div>
    </main>
  );
}
