import BalanceCard from "@/components/dashboard/BalanceCard";
import { Card, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileWelcomeHeader from "@/components/dashboard/ProfileWelcomeHeader";
import {
  mockBalance,
  mockProfileStats,
  mockUser,
  mockRewardsData,
} from "@/lib/data/mockData";
import Details from "@/components/profile/Details";
import Statistics from "@/components/profile/Statistics";
import Rewards from "@/components/profile/Rewards";
import { CiCalendar } from "react-icons/ci";
import { IoMedalOutline } from "react-icons/io5";
import { LuCoins } from "react-icons/lu";

export default function ProfilePage() {
  return (
    <main
      className="min-h-screen bg-gray-50 relative overflow-x-hidden"
      role="main"
      aria-label="Profile"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{
          backgroundImage: `url('/images/dashboard.svg')`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 pb-safe-area-bottom">
        {/* Header Section with Welcome and Balance */}
        <div className="px-6 pt-12 pb-8">
          <div className="flex items-center space-x-2 gap-4">
            <ProfileWelcomeHeader name={mockUser.username} />
            <BalanceCard amount={mockBalance} />
          </div>

          <Card className="flex flex-row bg-purple-300 mt-10">
            <div className="flex-1 p-4 border-r border-gray-300 flex flex-col justify-center items-center">
              <LuCoins size={32} color="white" />
              <CardDescription className="text-background">
                Points
              </CardDescription>
              <p className="text-background font-mono">
                {mockProfileStats.points}
              </p>
            </div>
            <div className="flex-1 p-4 border-r border-gray-300 flex flex-col justify-center items-center">
              <IoMedalOutline size={32} color="white" />
              <CardDescription className="text-background">
                Best Rank
              </CardDescription>
              <p className="text-background font-mono">
                {mockProfileStats.bestRank}
              </p>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center items-center">
              <CiCalendar size={32} color="white" />
              <CardDescription className="text-background">
                This week
              </CardDescription>
              <p className="text-background font-mono">
                {mockProfileStats.weekStatus}
              </p>
            </div>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="px-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
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
                username={mockUser.username}
                walletAddress={mockUser.walletAddress}
                joinedDate={mockUser.joinedDate}
                favQuizTopic={mockUser.favQuizTopic}
              />
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              <Statistics
                data={{
                  quizzesWonThisWeek: mockProfileStats.quizzesWonThisWeek,
                  totalQuizzesThisWeek: mockProfileStats.totalQuizzesThisWeek,
                  topCategoriesThisWeek: mockProfileStats.topCategoriesThisWeek,
                }}
              />
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <Rewards data={mockRewardsData} />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              {/* Settings component will be implemented later */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
