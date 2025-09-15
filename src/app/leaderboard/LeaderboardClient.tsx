"use client";

import React, { useEffect, useState } from "react";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";
import Top3Ranks from "@/components/leaderboard/Top3Ranks";
import { useAccount } from "wagmi";
import { useUser } from "@/context/userContext";
import Spinner from "@/components/ui/Spinner";
import type { user } from "@/generated/prisma";

type LeaderboardEntry = {
  user: user | null;
  points: number;
  id: string;
};

export default function LeaderboardClient() {
  const [activeTab, setActiveTab] = useState<"week" | "allTime">("week");
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [displayedUsers, setDisplayedUsers] = useState<number>(6);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  // `useUser` provides header info (rendered by small client components elsewhere).
  // We don't need username/balance here directly; keep call minimal to avoid
  // unnecessary re-renders.
  void useUser();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!address || !isConnected) {
      setError("User Is Not Connected");
      setLoading(false);
      setLeaderboardData([]);
      return;
    }

    const controller = new AbortController();
    const fetchLeaderboard = async () => {
      setLoading(true);
      const url =
        activeTab === "week"
          ? "/api/leaderboard/points"
          : "/api/leaderboard/overallpoints";
      try {
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Failed to load leaderboard");
          setLeaderboardData([]);
          return;
        }
        setLeaderboardData(data);
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as { name?: unknown }).name === "AbortError"
        )
          return;
        console.error("Failed to fetch leaderboard", err);
        setError("Failed to fetch leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    return () => controller.abort();
  }, [address, isConnected, activeTab]);

  // Timer for weekly remaining time
  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const hoursInDay = now.getHours();
      const minutesInHour = now.getMinutes();
      const secondsInMinute = now.getSeconds();

      const daysRemaining = 7 - dayOfWeek;
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

  const currentLeaderboard = leaderboardData;
  const top3Users = currentLeaderboard.slice(0, 3);
  const remainingUsers = currentLeaderboard.slice(3, displayedUsers);
  const hasMore = displayedUsers < currentLeaderboard.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedUsers((prev) =>
        Math.min(prev + 3, currentLeaderboard.length)
      );
      setLoading(false);
    }, 600);
  };

  const handleTabChange = (tab: "week" | "allTime") => {
    setActiveTab(tab);
    setDisplayedUsers(6);
    setError(null);
  };

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-[-1.5rem] rounded-t-3xl p-6 min-h-[600px] font-mono overflow-hidden bg-gradient-to-b from-background via-primary to-card">
      <h2 className="text-foreground text-2xl font-bold mb-6">Leaderboard</h2>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-border">
          <button
            className={`pb-2 px-4 text-base transition-colors ${
              activeTab === "week"
                ? "text-foreground font-semibold border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => handleTabChange("week")}
            aria-label="View this week's leaderboard"
          >
            This week
          </button>
          <button
            className={`pb-2 px-4 text-base transition-colors ${
              activeTab === "allTime"
                ? "text-foreground font-semibold border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => handleTabChange("allTime")}
            aria-label="View all time leaderboard"
          >
            All time
          </button>
        </div>

        {activeTab === "week" && (
          <div className="flex items-center mt-2 text-muted-foreground text-sm">
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
            <span aria-label="Time remaining in the week">{timeRemaining}</span>
          </div>
        )}
      </div>

      {/* Top 3 Ranks */}
      <div className="mt-6 relative pb-20">
        <Top3Ranks
          top3Users={top3Users.map((entry, idx) => ({
            id: entry.id,
            rank: idx + 1,
            username: entry.user?.username ?? "Unknown",
            points: entry.points,
          }))}
        />
      </div>

      {/* Scrollable list */}
      <div className="mx-[-1.5rem] -mt-24">
        {remainingUsers.length > 0 && (
          <LeaderboardList
            users={remainingUsers.map((entry, idx) => ({
              id: entry.id,
              rank: idx + 4,
              username: entry.user?.username ?? "Unknown",
              points: entry.points,
            }))}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
