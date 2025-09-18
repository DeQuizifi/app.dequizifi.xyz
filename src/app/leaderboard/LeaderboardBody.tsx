"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";
import Top3Ranks from "@/components/leaderboard/Top3Ranks";
import type { user } from "@/generated/prisma";

type LeaderboardEntry = {
  user: user | null;
  points: number;
  id: string;
};

interface Props {
  activeTab: "week" | "allTime";
  initialWeekData?: LeaderboardEntry[];
  initialAllTimeData?: LeaderboardEntry[];
}

// Loading skeleton component
const LeaderboardSkeleton = () => (
  <div className="space-y-6">
    <div className="mt-6 relative pb-20">
      <div className="flex justify-center space-x-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="w-24 h-32 bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    </div>
    <div className="mx-[-1.5rem] -mt-24 space-y-2">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="h-16 bg-muted animate-pulse rounded-lg mx-6" />
      ))}
    </div>
  </div>
);

export default function LeaderboardBody({
  activeTab,
  initialWeekData = [],
  initialAllTimeData = [],
}: Props) {
  const [tabData, setTabData] = useState({
    week: initialWeekData,
    allTime: initialAllTimeData,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState(6);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  // Reset page size per tab for consistent UX
  useEffect(() => {
    setDisplayedUsers(6);
    setError(null); // also clear stale errors on tab switch
  }, [activeTab]);

  // Fetch data for active tab
  const fetchData = useCallback(async () => {
    // If we already have data, skip fetch and do not surface errors
    if (tabData[activeTab].length > 0) return;

    if (!address || !isConnected) {
      setError("User is not connected");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url =
        activeTab === "week"
          ? "/api/leaderboard/points"
          : "/api/leaderboard/overallpoints";

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load leaderboard");
      }

      setTabData((prev) => ({ ...prev, [activeTab]: data }));
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch leaderboard"
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, address, isConnected, tabData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Get current data and computed values
  const currentData = tabData[activeTab];
  const top3Users = currentData.slice(0, 3);
  const remainingUsers = currentData.slice(3, displayedUsers);
  const hasMore = displayedUsers < currentData.length;

  const handleLoadMore = () => {
    setDisplayedUsers((prev) => Math.min(prev + 3, currentData.length));
  };

  // Transform data for components
  const transformedTop3 = top3Users.map((entry, idx) => ({
    id: entry.id,
    rank: idx + 1,
    username: entry.user?.username ?? "Unknown",
    points: entry.points,
  }));

  const transformedRemaining = remainingUsers.map((entry, idx) => ({
    id: entry.id,
    rank: idx + 4,
    username: entry.user?.username ?? "Unknown",
    points: entry.points,
  }));

  if (error && currentData.length === 0) {
    return <div className="text-destructive text-center py-8">{error}</div>;
  }

  if (isLoading && currentData.length === 0) {
    return <LeaderboardSkeleton />;
  }

  return (
    <>
      {error && currentData.length > 0 && (
        <div className="text-destructive text-center py-2">{error}</div>
      )}
      <div className="mt-6 relative pb-20">
        <Top3Ranks top3Users={transformedTop3} />
      </div>

      <div className="mx-[-1.5rem] -mt-24">
        {transformedRemaining.length > 0 && (
          <LeaderboardList
            users={transformedRemaining}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={false}
          />
        )}
      </div>
    </>
  );
}
