"use client";
import { Card, CardDescription } from "@/components/ui/card";
import { LuCoins } from "react-icons/lu";
import { IoMedalOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

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
    const fetchoverallstats = async () => {
      try {
        const res = await fetch(
          `/api/profile/overallstatistics?address=${address}`
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || error);
          setAllStats(null);
        }
        setAllStats(data.overallstats);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Internal Server Error");
        setAllStats(null);
      }
    };
    fetchoverallstats();
  }, [address, isConnected, error]);

  if (error) {
    return <div className="text-destructive">No Statistics Found</div>;
  }

  return (
    <Card className="flex flex-row bg-purple-300 mt-10">
      <div className="flex-1 p-4 border-r border-gray-300 flex flex-col justify-center items-center">
        <LuCoins size={32} color="white" />
        <CardDescription className="text-background">Points</CardDescription>
        <p className="text-background font-mono">
          {allstats?.overallPoints}
        </p>
      </div>
      <div className="flex-1 p-4 border-r border-gray-300 flex flex-col justify-center items-center">
        <IoMedalOutline size={32} color="white" />
        <CardDescription className="text-background">Best Rank</CardDescription>
        <p className="text-background font-mono">{allstats?.bestRank}</p>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-center items-center">
        <CiCalendar size={32} color="white" />
        <CardDescription className="text-background">This week</CardDescription>
        <p className="text-background font-mono">{allstats?.weekStatus}</p>
      </div>
    </Card>
  );
}

export default OverallStatistics;
