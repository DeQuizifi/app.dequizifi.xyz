"use client";
import Image from "next/image";
import { PlayTodayQuiz } from "@/lib/data/mockData";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

interface ContestSummary {
  name: string;
  participantCount: number;
  timeLeftHours: number;
}

export default function PlayToday() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [contests, setContests] = useState<ContestSummary[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchTrendingContest = async () => {
      try {
        const res = await fetch("/api/play/trendingContest");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "No response found");
          setContests([]);
        } else {
          setContests(data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch trending contest");
      }
    };
    fetchTrendingContest();
  }, []);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="space-y-4">
      {/* Section Title */}
      <h2
        className="text-2xl font-bold px-6"
        style={{ color: "var(--card-foreground)" }}
      >
        What would you like to play <br /> today?
      </h2>

      {/* Horizontally Scrollable Contest Cards */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-6">
        {contests.map((contest, index) => (
          <div
            key={contest.name + index}
            className={`flex-shrink-0 w-52 h-44 relative ${
              index === contests.length - 1 ? "mr-6" : ""
            }`}
          >
            <div
              className="w-full h-full rounded-lg relative overflow-hidden"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/playQuizImage.svg"
                  alt="Contest background"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <h3 className="text-white text-xl font-bold leading-tight">
                  {contest.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-white text-base font-bold">
                    {contest.participantCount} Participants
                  </p>
                  <p className="text-white text-base font-bold opacity-90">
                    {contest.timeLeftHours} Hours Left
                  </p>
                  <div className="w-full h-1 bg-white bg-opacity-20 rounded-full mt-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "75%",
                        backgroundColor: "var(--progress-bar-playtoday)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// QuizCard removed; contests are rendered directly above
