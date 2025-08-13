"use client";

import React, { useState, useEffect } from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BalanceCard from "@/components/dashboard/BalanceCard";
import Top3Ranks from "@/components/leaderboard/Top3Ranks";
import { cn } from "@/lib/utils";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"week" | "allTime">("week");
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState<number>(6); // Initially show 6 users (3 top + 3 in list)

  // Mock leaderboard data
  const mockLeaderboardData = {
    week: [
      { id: "1", rank: 1, username: "Alice", points: 453 },
      { id: "2", rank: 2, username: "Bob", points: 442 },
      { id: "3", rank: 3, username: "Charlie", points: 433 },
      { id: "4", rank: 4, username: "Jessica", points: 223 },
      { id: "5", rank: 5, username: "Elsa", points: 160 },
      { id: "6", rank: 6, username: "Knelson", points: 140 },
      { id: "7", rank: 7, username: "Michael", points: 135 },
      { id: "8", rank: 8, username: "Sarah", points: 130 },
      { id: "9", rank: 9, username: "John", points: 125 },
      { id: "10", rank: 10, username: "Emma", points: 120 },
      { id: "11", rank: 11, username: "Ryan", points: 115 },
      { id: "12", rank: 12, username: "Lisa", points: 110 },
    ],
    allTime: [
      { id: "1", rank: 1, username: "David", points: 1250 },
      { id: "2", rank: 2, username: "Emma", points: 1180 },
      { id: "3", rank: 3, username: "Frank", points: 1120 },
      { id: "4", rank: 4, username: "Grace", points: 890 },
      { id: "5", rank: 5, username: "Henry", points: 750 },
      { id: "6", rank: 6, username: "Iris", points: 620 },
      { id: "7", rank: 7, username: "Jack", points: 580 },
      { id: "8", rank: 8, username: "Kate", points: 540 },
      { id: "9", rank: 9, username: "Leo", points: 500 },
      { id: "10", rank: 10, username: "Maya", points: 460 },
      { id: "11", rank: 11, username: "Nick", points: 420 },
      { id: "12", rank: 12, username: "Olivia", points: 380 },
    ],
  };

  const currentLeaderboard = mockLeaderboardData[activeTab];
  const top3Users = currentLeaderboard.slice(0, 3);
  const remainingUsers = currentLeaderboard.slice(3, displayedUsers);
  const hasMore = displayedUsers < currentLeaderboard.length;

  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedUsers(prev => Math.min(prev + 3, currentLeaderboard.length));
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
          <WelcomeHeader name="Arion Loveless" />
          <BalanceCard amount={602} />
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
          <div className="mt-6 relative" style={{ paddingBottom: '100px' }}>
            <Top3Ranks top3Users={top3Users} />
          </div>

          {/* Scrollable List of Other Users */}
          <div className="mx-[-3rem]" style={{ marginTop: '-100px' }}>
            {remainingUsers.length > 0 && (
              <LeaderboardList
                users={remainingUsers}
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
