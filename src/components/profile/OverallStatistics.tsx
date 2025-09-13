"use client";
import { Card, CardDescription } from "@/components/ui/card";
import { LuCoins } from "react-icons/lu";
import { IoMedalOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Spinner from "@/components/ui/Spinner";

interface OverallStatisticsProps {
  overallPoints: number;
  bestRank: string | number;
  weekStatus: string | number;
}

function OverallStatistics() {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [allstats, setAllStats] = useState<OverallStatisticsProps | null>(null);
  const [loading, setLoading] = useState(false);

  //OverStats fetching
  useEffect(() => {
    if (!address || !isConnected) {
      setError("Wallet is not connected");
      setAllStats(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const { signal } = controller;
    const fetchOverallStats = async () => {
      try {
        const res = await fetch(`/api/profile/overallstatistics`, { signal });
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error ?? "Failed to fetch overall statistics");
          setAllStats(null);
          setLoading(false);
          return;
        }
        setAllStats(data.overallstats);
        setError(null);
        setLoading(false);
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
        console.error(err);
        setError("Internal Server Error");
        setAllStats(null);
        setLoading(false);
      }
    };
    fetchOverallStats();
    return () => controller.abort();
  }, [address, isConnected]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-[30vh]"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        <Spinner size={64} />
      </div>
    );
  }
  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  if (!allstats) return null; // Or a skeleton loader

  return (
    <Card className="flex flex-row bg-card mt-10">
      <div className="flex-1 p-4 border-r border-card-border flex flex-col justify-center items-center">
        <LuCoins size={32} className="text-foreground" />
        <CardDescription className="text-muted-foreground">
          Points
        </CardDescription>
        <p className="text-foreground font-mono">{allstats.overallPoints}</p>
      </div>
      <div className="flex-1 p-4 border-r border-card-border flex flex-col justify-center items-center">
        <IoMedalOutline size={32} className="text-foreground" />
        <CardDescription className="text-muted-foreground">
          Best Rank
        </CardDescription>
        <p className="text-foreground font-mono">{allstats.bestRank}</p>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-center items-center">
        <CiCalendar size={32} className="text-[var(--foreground)]" />
        <CardDescription className="text-muted-foreground">
          This week
        </CardDescription>
        <p className="text-foreground">{allstats.weekStatus}</p>
      </div>
    </Card>
  );
}

export default OverallStatistics;
