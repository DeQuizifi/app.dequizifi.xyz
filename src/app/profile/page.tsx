import BalanceCard from "@/components/dashboard/BalanceCard";
import {
  Card,
  CardDescription,
} from "@/components/ui/card";

import { IoMedalOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { LuCoins } from "react-icons/lu";
import ProfileWelcomeHeader from "@/components/dashboard/ProfileWelcomeHeader";

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
            <ProfileWelcomeHeader name="Arion Loveless" />
            <BalanceCard amount={602} />
          </div>

          <Card className="flex flex-row bg-purple-300 mt-10">
            <div className="flex-1 p-4 border-r border-gray-300 flex flex-col justify-center items-center">
              <LuCoins size={32} color="white"/>
              <CardDescription className="text-background">Points</CardDescription>
              <p className="text-background font-mono">1742</p>
            </div>
            <div className="flex-1 p-4 border-r border-gray-300 flex flex-col justify-center items-center">
              <IoMedalOutline size={32} color="white"/>
              <CardDescription className="text-background">Best Rank</CardDescription>
              <p className="text-background font-mono">#3</p>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center items-center">
              <CiCalendar size={32} color="white"/>
              <CardDescription className="text-background">This week</CardDescription>
              <p className="text-background font-mono">Unranked</p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
