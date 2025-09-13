"use client";
import BalanceCard from "@/components/dashboard/BalanceCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import OverallStatistics from "@/components/profile/OverallStatistics";
import Details from "@/components/profile/Details";
import { useUser } from "@/context/userContext";
import Statistics from "@/components/profile/Statistics";
import Rewards from "@/components/profile/Rewards";
import Settings from "@/components/profile/Settings";

export default function ProfilePage() {
  // Get dynamic user info from context
  const { username, balance, address } = useUser();

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
          <div className="flex items-center space-x-2 gap-4">
            {/* Dynamic name, address, and balance from context */}
            <WelcomeHeader name={username || "User"} address={address ?? ""} />
            <BalanceCard amount={balance ?? 0} />
          </div>

          {/* You may need to update OverallStatistics to fetch its own data or use context */}
          <OverallStatistics />
        </div>

        {/* Tabs Section */}
        <div className="px-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              <TabsTrigger value="details" className="text-sm">
                Details
              </TabsTrigger>
              <TabsTrigger value="statistics" className="text-sm">
                Statistics
              </TabsTrigger>
              <TabsTrigger value="rewards" className="text-sm">
                Rewards
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-sm">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Details
                username={username || "User"}
                walletAddress={address ?? "Not Set"}
                joinedDate={""}
                favQuizTopic={"None"}
              />
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              {/* You may want to fetch userstats in a client-side hook and pass to Statistics */}
              <Statistics />
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <Rewards />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Settings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
