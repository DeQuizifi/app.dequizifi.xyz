import BalanceCard from "@/components/dashboard/BalanceCard";
import { Card, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileWelcomeHeader from "@/components/dashboard/ProfileWelcomeHeader";
import { CiCalendar } from "react-icons/ci";
import { IoMedalOutline } from "react-icons/io5";
import { LuCoins } from "react-icons/lu";
import Details from "@/components/profile/Details";
import { getRewards, getUser, getUserStats, profilePersonalStats, userWelcomeHeader } from "@/lib/profile/user";
import Statistics from "@/components/profile/Statistics";
import Rewards from "@/components/profile/Rewards";

export default async function ProfilePage() {
  //UserInfo
  const user = await getUser();
  if (!user) {
    return <div>User Not Found.</div>;
  }
  
 //UserStats
   const userstats = (await getUserStats(user.id)) || [];


  //User Balance, Name and Address
  const balance = await userWelcomeHeader(user.id);
  if(!balance){
    return null;
  }

  //User Points and Best Rank

  const stat = await profilePersonalStats(user.id);
  if(!stat){
    return null;
  }
  
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
            <ProfileWelcomeHeader name={user.username} walletaddress={user.walletAddress || ""} />
            <BalanceCard amount={user.balance} />
          </div>

          <Card className="flex flex-row bg-purple-300 mt-10">
            <div className="flex-1 p-4 border-r border-gray-300 flex flex-col justify-center items-center">
              <LuCoins size={32} color="white" />
              <CardDescription className="text-background">
                Points
              </CardDescription>
              <p className="text-background font-mono">
                {stat.overallPoints}
              </p>
            </div>
            <div className="flex-1 p-4 border-r border-gray-300 flex flex-col justify-center items-center">
              <IoMedalOutline size={32} color="white" />
              <CardDescription className="text-background">
                Best Rank
              </CardDescription>
              <p className="text-background font-mono">
                {stat.bestRank}
              </p>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center items-center">
              <CiCalendar size={32} color="white" />
              <CardDescription className="text-background">
                This week
              </CardDescription>
              <p className="text-background font-mono">
                {stat.weekStatus}
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
                username={user.username}
                walletAddress={user.walletAddress || "Not Set"}
                joinedDate={user.joinedDate.toISOString()}
                favQuizTopic={user.favQuizTopic || "None"}
              />
            </TabsContent>

            <TabsContent value="statistics" className="mt-6">
              {userstats && userstats.length > 0 ? (
                <Statistics/>
              ) : (
                <div className="bg-white rounded-xl p-6 text-center text-gray-700 shadow flex items-center justify-center min-h-[500px] w-full">
                  No Stats Found.
                </div>
              )}
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <Rewards/>
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
