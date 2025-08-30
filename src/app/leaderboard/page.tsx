"use client";

import BalanceCard from "@/components/dashboard/BalanceCard";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";
import Top3Ranks from "@/components/leaderboard/Top3Ranks";
import { user } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useUser } from "@/context/userContext";

type LeaderboardEntry = {
  user: user | null;
  points: number;
  id: string;
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"week" | "allTime">("week");
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [displayedUsers, setDisplayedUsers] = useState<number>(6); // Initially show 6 users (3 top + 3 in list)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const { username, balance } = useUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      const url =
        activeTab === "week"
          ? "/api/leaderboard/points"
          : "/api/leaderboard/overallpoints";
      try {
        const res = await fetch(url);
        if (!res.ok) {
          // Optionally: surface an error state
          return;
        }
        const data = await res.json();
        setLeaderboardData(data);
      } catch (e) {
        console.error("Failed to fetch leaderboard", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab]);

  const currentLeaderboard = leaderboardData;
  const top3Users = currentLeaderboard.slice(0, 3);
  const remainingUsers = currentLeaderboard.slice(3, displayedUsers);
  const hasMore = displayedUsers < currentLeaderboard.length;

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedUsers((prev) =>
        Math.min(prev + 3, currentLeaderboard.length)
      );
      setLoading(false);
    }, 1000);
  };

  // Calculate time remaining in the week
  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday
      const hoursInDay = now.getHours();
      const minutesInHour = now.getMinutes();
      const secondsInMinute = now.getSeconds();

      // Calculate days until end of week (Sunday)
      const daysRemaining = 7 - dayOfWeek;

      // Calculate total hours, minutes, seconds remaining
      const hoursRemaining = 24 - hoursInDay - 1;
      const minutesRemaining = 60 - minutesInHour - 1;
      const secondsRemaining = 60 - secondsInMinute;

      setTimeRemaining(
        `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`
      );
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTabChange = (tab: "week" | "allTime") => {
    setActiveTab(tab);
    setDisplayedUsers(6); // Reset to show initial 6 users when tab changes
    // In a real implementation, here we would fetch the appropriate leaderboard data
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/dashboard.svg')",
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 p-6">
        {/* Header Section with Welcome and Balance */}
        <div className="flex items-start justify-between mb-8">
          <WelcomeHeader name={username ?? undefined} />
          <BalanceCard amount={balance ?? 0} />
        </div>

        {/* Leaderboard Content Area */}
        <div
          className={cn(
            // Full-bleed horizontally, rounded only on the top
            "mx-[-1.5rem] rounded-t-3xl p-6 min-h-[600px] font-mono overflow-hidden"
          )}
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FFFFFF 0%, #5F478F 55%, #272052 100%)",
          }}
        >
          <h2 className="text-[#1b123d] text-2xl font-bold mb-6">
            Leaderboard
          </h2>

          {/* Tabs for Ranking View */}
          <div className="mb-6">
            <div className="flex border-b border-black/10">
              <button
                className={cn(
                  "pb-2 px-4 text-base transition-colors",
                  // Active: dark purple text with solid underline
                  activeTab === "week"
                    ? "text-[#2B2356] font-semibold border-b-2 border-[#2B2356]"
                    : "text-black/50 hover:text-black/70"
                )}
                onClick={() => handleTabChange("week")}
                aria-label="View this week's leaderboard"
              >
                This week
              </button>
              <button
                className={cn(
                  "pb-2 px-4 text-base transition-colors",
                  activeTab === "allTime"
                    ? "text-[#2B2356] font-semibold border-b-2 border-[#2B2356]"
                    : "text-black/50 hover:text-black/70"
                )}
                onClick={() => handleTabChange("allTime")}
                aria-label="View all time leaderboard"
              >
                All time
              </button>
            </div>

            {/* Time Remaining Display (Only shown for "This week" tab) */}
            {activeTab === "week" && (
              <div className="flex items-center mt-2 text-black/60 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span aria-label="Time remaining in the week">
                  {timeRemaining}
                </span>
              </div>
            )}
          </div>

          {/* Top 3 Ranks Section */}
          <div className="mt-6 relative" style={{ paddingBottom: "100px" }}>
            <Top3Ranks
              top3Users={top3Users.map((entry, idx) => ({
                id: entry.id,
                rank: idx + 1,
                username: entry.user?.username ?? "Unknown",
                points: entry.points, // or entry.overallPoints, depending on your schema
              }))}
            />
          </div>

          {/* Scrollable List of Other Users */}
          <div className="mx-[-1.5rem]" style={{ marginTop: "-100px" }}>
            {remainingUsers.length > 0 && (
              <LeaderboardList
                users={remainingUsers.map((entry, idx) => ({
                  id: entry.id,
                  rank: idx + 4, // or your actual rank logic
                  username: entry.user?.username ?? "Unknown",
                  points: entry.points, // or entry.overallPoints, depending on your schema
                }))}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
