"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Spinner from "@/components/ui/Spinner";
import { Lock, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
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

  // Convert xpProgress (0-100) to one of Tailwind's fractional width classes (w-0, w-1/12 .. w-11/12, w-full)
  const xpWidthClass = (() => {
    const n = Math.round((xpProgress / 100) * 12);
    if (n <= 0) return "w-0";
    if (n >= 12) return "w-full";
    return `w-${n}/12`;
  })();

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
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <Spinner size={64} />
      </div>
    );
  }
  return (
    <div className="bg-card rounded-t-3xl min-h-[60vh] p-6">
      <div className="space-y-6">
        {/* XP Level Section */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                XP Level
              </p>
              <p className="text-foreground text-2xl font-bold">
                {rewards.xpLevel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">
                {rewards.xpPointsToNext} points to next level
              </p>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${xpWidthClass}`}
            />
          </div>
        </div>

        {/* Rank Section */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Rank</p>
              <p className="text-foreground text-xl font-bold">
                {rewards.rank}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">
                Next rank unlocks at XP Level {rewards.nextRankUnlockLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Points Section */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium mb-1">
                Points
              </p>
              <p className="text-foreground text-xl font-bold">
                {rewards && typeof rewards.points === "number"
                  ? rewards.points.toLocaleString()
                  : 0}{" "}
                Points Earned
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-4 py-2 font-medium rounded-md"
            >
              Redeem
            </Button>
          </div>
        </div>

        {/* Trophies Section */}
        <div>
          <h3 className="text-foreground text-lg font-semibold mb-4">
            Trophies
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {Array.isArray(rewards?.trophies) &&
              rewards.trophies.map((trophy, index) => (
                <Card
                  key={index}
                  className={
                    trophy.unlocked
                      ? "transition-all duration-200 border border-border bg-gradient-to-br from-muted to-card shadow-sm"
                      : "transition-all duration-200 border border-border bg-muted shadow-sm"
                  }
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={
                        trophy.unlocked
                          ? "inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 transition-all bg-gradient-to-br from-muted to-card"
                          : "inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 transition-all bg-muted"
                      }
                    >
                      {trophy.unlocked ? (
                        <Trophy className="w-8 h-8 text-primary" />
                      ) : (
                        <Lock className="w-7 h-7 text-muted-foreground" />
                      )}
                    </div>
                    {trophy.unlocked ? (
                      <p className="text-sm font-medium text-foreground">
                        {trophy.name}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-muted-foreground">
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
