"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Spinner from "@/components/ui/Spinner";

interface StatisticsData {
  quizzesWonThisWeek: number;
  totalQuizzesThisWeek: number;
  topCategories: Array<{
    category: string;
    quizzesWon: number;
    totalQuizzes: number;
  }>;
}

function Statistics() {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);

  useEffect(() => {
    const fetchstats = async () => {
      try {
        if (!address || !isConnected) {
          setError("Wallet is not connected");
          setStatistics(null);
          return;
        }
        const res = await fetch(`/api/profile/statistics`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch details");
          setStatistics(null);
          return;
        }
        setStatistics(data.userStats);
        console.log("Fetched Statistics:", data);
        setError(null);
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message || "Failed to fetch details");
        } else {
          setError("Failed to fetch details");
        }
      }
    };

    fetchstats();
  }, [address, isConnected]);

  if (error) {
    return <div className="text-destructive">Error: {error}</div>;
  }
  if (!statistics) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <Spinner size={64} />
      </div>
    );
  }

  const { quizzesWonThisWeek, totalQuizzesThisWeek, topCategories } =
    statistics;
  const winPercentage = (quizzesWonThisWeek / totalQuizzesThisWeek) * 100;

  // Calculate the stroke offset for the circular progress
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (winPercentage / 100) * circumference;

  return (
    <div className="bg-card rounded-t-3xl min-h-[60vh] p-6">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Statistics
          </h2>
        </div>

        {/* Quizzes Won Section */}
        <div className="text-center space-y-6">
          <div>
            <p className="text-muted-foreground text-lg mb-1">
              You have won a total
            </p>
            <p className="text-2xl font-bold">
              <span className="text-primary">
                {statistics.quizzesWonThisWeek} quizzes
              </span>{" "}
              <span className="text-foreground">this week</span>
            </p>
          </div>

          {/* Circular Progress Chart */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg
                className="w-40 h-40 transform -rotate-90"
                viewBox="0 0 140 140"
              >
                {/* Background circle */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  className="transition-all duration-500 ease-in-out"
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-foreground">
                  {statistics.quizzesWonThisWeek}/
                  {statistics.totalQuizzesThisWeek}
                </div>
                <div className="text-sm text-muted-foreground">quizzes won</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories Section */}
        <div className="space-y-4 mb-20">
          <h3 className="text-lg font-semibold text-foreground">
            Your Top Categories This Week
          </h3>

          <div className="space-y-3 ">
            {topCategories.map((category, index) => {
              const categoryPercentage =
                (category.quizzesWon / category.totalQuizzes) * 100;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      {category.category}
                    </h4>

                    {/* Progress bar */}
                    <div className="w-full bg-background rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${categoryPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="ml-4 text-right">
                    <span className="text-sm font-semibold text-foreground">
                      {category.quizzesWon}/{category.totalQuizzes}
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      won
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
