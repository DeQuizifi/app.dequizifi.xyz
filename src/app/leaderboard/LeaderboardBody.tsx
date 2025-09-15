"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";
import Top3Ranks from "@/components/leaderboard/Top3Ranks";
import Spinner from "@/components/ui/Spinner";
import type { user } from "@/generated/prisma";

type LeaderboardEntry = {
  user: user | null;
  points: number;
  id: string;
};

interface Props {
  activeTab: "week" | "allTime";
}

export default function LeaderboardBody({ activeTab }: Props) {
  const [loading, setLoading] = useState(true);
  const [displayedUsers, setDisplayedUsers] = useState<number>(6);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
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
      // Clear any previous error when starting a new fetch
      setError(null);
      setLoading(true);
      const url =
        activeTab === "week"
          ? "/api/leaderboard/points"
          : "/api/leaderboard/overallpoints";
      try {
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        // If the request was aborted while awaiting, avoid updating state
        if (controller.signal.aborted) return;

        if (!res.ok) {
          setError(data.error ?? "Failed to load leaderboard");
          setLeaderboardData([]);
          return;
        }

        // Clear any error and set data on success (guarded by abort check above)
        setError(null);
        setLeaderboardData(data);
      } catch (err: unknown) {
        // Robust abort detection: either DOMException or object with name === 'AbortError'
        const isAbortError =
          (typeof err === "object" &&
            err !== null &&
            "name" in err &&
            (err as unknown as { name?: unknown }).name === "AbortError") ||
          (err instanceof DOMException &&
            (err as DOMException).name === "AbortError");

        if (isAbortError) return;

        console.error("Failed to fetch leaderboard", err);
        // Only set error if not aborted/unmounted
        if (!controller.signal.aborted) setError("Failed to fetch leaderboard");
      } finally {
        // Avoid setting loading state if the request was aborted or component unmounted
        if (controller.signal.aborted) return;
        setLoading(false);
      }
    };

    fetchLeaderboard();
    return () => controller.abort();
  }, [address, isConnected, activeTab]);

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
    <>
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
    </>
  );
}
