"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
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

export default function LeaderboardBody({
  activeTab,
  initialWeekData = [],
  initialAllTimeData = [],
}: Props) {
  // Separate data cache per tab to avoid refetching when switching
  const [weekData, setWeekData] = useState<LeaderboardEntry[]>(initialWeekData);
  const [allTimeData, setAllTimeData] =
    useState<LeaderboardEntry[]>(initialAllTimeData);

  // Separate loading states: first load vs pagination
  const [loadingState, setLoadingState] = useState<{
    week: "idle" | "loading" | "error";
    allTime: "idle" | "loading" | "error";
  }>({
    week: "idle",
    allTime: "idle",
  });

  const [displayedUsers, setDisplayedUsers] = useState<number>(6);
  const [isPaginating, setIsPaginating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  // Optimized fetch function that only fetches missing data
  const fetchTabData = useCallback(
    async (tab: "week" | "allTime", controller?: AbortController) => {
      if (!address || !isConnected) {
        setError("User Is Not Connected");
        setLoadingState((prev) => ({ ...prev, [tab]: "error" }));
        return;
      }

      const ac = controller ?? new AbortController();

      try {
        setError(null);
        setLoadingState((prev) => ({ ...prev, [tab]: "loading" }));

        const url =
          tab === "week"
            ? "/api/leaderboard/points"
            : "/api/leaderboard/overallpoints";

        const res = await fetch(url, { signal: ac.signal });
        const data = await res.json();

        if (ac.signal.aborted) return;

        if (!res.ok) {
          setError(data.error ?? "Failed to load leaderboard");
          setLoadingState((prev) => ({ ...prev, [tab]: "error" }));
          return;
        }

        // Update the specific tab's data
        if (tab === "week") {
          setWeekData(data);
        } else {
          setAllTimeData(data);
        }

        setLoadingState((prev) => ({ ...prev, [tab]: "idle" }));
      } catch (err: unknown) {
        const isAbortError =
          (typeof err === "object" &&
            err !== null &&
            "name" in err &&
            (err as unknown as { name?: unknown }).name === "AbortError") ||
          (err instanceof DOMException &&
            (err as DOMException).name === "AbortError");

        if (isAbortError) return;

        console.error("Failed to fetch leaderboard", err);
        if (!ac.signal.aborted) {
          setError("Failed to fetch leaderboard");
          setLoadingState((prev) => ({ ...prev, [tab]: "error" }));
        }
      }
    },
    [address, isConnected]
  );

  useEffect(() => {
    // Only fetch if we don't have data for the active tab
    const currentData = activeTab === "week" ? weekData : allTimeData;
    const currentStatus = loadingState[activeTab];
    const controller = new AbortController();

    if (currentData.length === 0 && currentStatus === "idle") {
      fetchTabData(activeTab, controller);
    }
    return () => controller.abort();
  }, [activeTab, weekData, allTimeData, loadingState, fetchTabData]);

  // Memoized current data based on active tab
  const currentData = useMemo(() => {
    return activeTab === "week" ? weekData : allTimeData;
  }, [activeTab, weekData, allTimeData]);

  // Memoized computed values to avoid recalculation on every render
  const { top3Users, remainingUsers, hasMore } = useMemo(() => {
    const top3 = currentData.slice(0, 3);
    const remaining = currentData.slice(3, displayedUsers);
    const more = displayedUsers < currentData.length;

    return {
      top3Users: top3,
      remainingUsers: remaining,
      hasMore: more,
    };
  }, [currentData, displayedUsers]);

  // Optimized load more - no artificial delay, separate pagination state
  const handleLoadMore = useCallback(() => {
    setIsPaginating(true);
    setDisplayedUsers((prev) => Math.min(prev + 3, currentData.length));
    // Remove pagination state after brief moment for UX
    setTimeout(() => setIsPaginating(false), 200);
  }, [currentData.length]);

  // Get current loading status
  const isFirstLoading =
    currentData.length === 0 && loadingState[activeTab] !== "error";
  const hasError = loadingState[activeTab] === "error";

  // Compact skeleton component for better UX than full-screen spinner
  const LeaderboardSkeleton = () => (
    <div className="space-y-6">
      {/* Top 3 skeleton */}
      <div className="mt-6 relative pb-20">
        <div className="flex justify-center space-x-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-24 h-32 bg-muted animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>

      {/* List skeleton */}
      <div className="mx-[-1.5rem] -mt-24 space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 bg-muted animate-pulse rounded-lg mx-6"
          ></div>
        ))}
      </div>
    </div>
  );

  if (hasError && error) {
    return <div className="text-destructive text-center py-8">{error}</div>;
  }

  if (isFirstLoading) {
    return <LeaderboardSkeleton />;
  }

  return (
    <>
      <div className="mt-6 relative pb-20">
        <Top3Ranks
          top3Users={top3Users.map((entry: LeaderboardEntry, idx: number) => ({
            id: entry.id,
            rank: idx + 1,
            username: entry.user?.username ?? "Unknown",
            points: entry.points,
          }))}
        />
      </div>

      <div className="mx-[-1.5rem] -mt-24">
        {remainingUsers.length > 0 && (
          <LeaderboardList
            users={remainingUsers.map(
              (entry: LeaderboardEntry, idx: number) => ({
                id: entry.id,
                rank: idx + 4,
                username: entry.user?.username ?? "Unknown",
                points: entry.points,
              })
            )}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            loading={isPaginating}
          />
        )}
      </div>
    </>
  );
}
