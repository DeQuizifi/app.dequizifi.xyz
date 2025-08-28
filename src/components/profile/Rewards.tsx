"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Lock } from "lucide-react";
import { useAccount } from "wagmi";

interface RewardsProps {
  xpLevel: number;
  xpPointsToNext: number;
  rank: string;
  nextRankUnlockLevel: number;
  points: number;
  trophies: TrophyProps[];
}

interface TrophyProps {
  id: string;
  name: string;
  unlocked: boolean;
  icon: string;
}

function Rewards() {
  // Calculate XP progress (assuming level 3 needs 1000 points, and 368 remaining means 632 earned)
  // const xpProgress = rewards ? ((1000 - rewards.xpPointsToNext) / 1000) * 100 : 0;

  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [rewards, setRewards] = useState<RewardsProps | null>(null);
  const [xpProgress, setXpProgress] = useState(0);

  useEffect(() => {
    if (!address || !isConnected) {
      setError("Wallet is not connected");
      setRewards(null);
      return;
    }
    const ac = new AbortController();
    const fetchRewards = async () => {
      try {
        const res = await fetch(`/api/profile/rewards`, {
          signal: ac.signal,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch rewards");
          setRewards(null);
          return;
        }
        const fetchedRewards = data.userrewards || data;
        setRewards(fetchedRewards);
        setXpProgress(((1000 - fetchedRewards.xpPointsToNext) / 1000) * 100);
        setError(null);
      } catch (error: unknown) {
        if ((error as Error & { name?: string })?.name === "AbortError") return;
        console.error(error);
        setError(
          error instanceof Error
            ? error.message || "Failed to fetch rewards"
            : "Failed to fetch rewards"
        );
      }
    };
    fetchRewards();
    return () => ac.abort();
  }, [address, isConnected]);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  if (!rewards) {
    return null;
  }
  return (
    <div className="bg-white rounded-t-3xl min-h-[60vh] p-6">
      <div className="space-y-6">
        {/* XP Level Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-gray-600 text-sm font-medium">XP Level</p>
              <p className="text-gray-900 text-2xl font-bold">
                {rewards.xpLevel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm">
                {rewards.xpPointsToNext} points to next level
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-400 to-pink-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* Rank Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rank</p>
              <p className="text-gray-900 text-xl font-bold">{rewards.rank}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm">
                Next rank unlocks at XP Level {rewards.nextRankUnlockLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Points Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Points</p>
              <p className="text-gray-900 text-xl font-bold">
                {rewards && typeof rewards.points === "number"
                  ? rewards.points.toLocaleString()
                  : 0}{" "}
                Points Earned
              </p>
            </div>
            <Button
              variant="outline"
              className="text-purple-600 border-purple-600 hover:bg-purple-50 hover:border-purple-700 px-4 py-2 font-medium rounded-md"
            >
              Redeem
            </Button>
          </div>
        </div>

        {/* Trophies Section */}
        <div>
          <h3 className="text-gray-900 text-lg font-semibold mb-4">Trophies</h3>
          <div className="grid grid-cols-3 gap-4">
            {Array.isArray(rewards?.trophies) &&
              rewards.trophies.map((trophy, index) => (
                <Card
                  key={index}
                  className={`transition-all duration-200 ${
                    trophy.unlocked
                      ? "border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-sm"
                      : "border border-gray-200 bg-gray-50 shadow-sm"
                  }`}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 transition-all ${
                        trophy.unlocked
                          ? "bg-gradient-to-br from-cyan-100 to-blue-100"
                          : "bg-gray-200"
                      }`}
                    >
                      {trophy.unlocked ? (
                        <Trophy className="w-8 h-8 text-cyan-600" />
                      ) : (
                        <Lock className="w-7 h-7 text-gray-400" />
                      )}
                    </div>
                    {trophy.unlocked ? (
                      <p className="text-sm font-medium text-cyan-900">
                        {trophy.name}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-gray-500">
                        Locked
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rewards;
