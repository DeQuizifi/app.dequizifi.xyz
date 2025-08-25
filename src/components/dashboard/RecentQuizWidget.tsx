"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircularProgress } from "./circular-progress";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

interface RecentQuizWidgetProps {
  title: string;
  progress: number;
  onClick?: () => void;
  className?: string;
}

type RecentQuizProps = {
  quizId: number;
  quiz: {
    title: string;
  };
};

type RecentQuizScoreProps = {
  quizId: number,
  score: number,
  quiz: {
    title: string;
  };
}

export default function RecentQuizWidget({
  title,
  progress,
  onClick,
  className,
}: RecentQuizWidgetProps) {
  //RecentQuizInformation
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<RecentQuizProps | null>();
  const [number, setNumber] = useState<RecentQuizScoreProps>();

  useEffect(() => {
    try {
      if (!isConnected || !address) {
        return setError("Can't find user");
      }
      const fetchrecentquizinfo = async () => {
        const [resTitle, resScore] = await Promise.all([
          fetch(`/api/dashboard/recentquiz?wallet=${address}`),
          fetch(`/api/dashboard/recentquizscore?wallet=${address}`),
        ]);
        const [dataTitle, dataScore] = await Promise.all([
          resTitle.json(),
          resScore.json(),
        ]);
        //For Title
        if (!resTitle.ok) {
          return setError(dataTitle.error);
        } else {
          setInfo(dataTitle.recentquiz);
        }

        //For Score
        if (!resScore.ok) {
          return setError(dataScore.error);
        } else {
          setNumber(dataScore.recentquiz);
        }
      };
      fetchrecentquizinfo();
    } catch (error) {
      console.error(error);
      setError("Internal Server Error");
    }
  }, [address, isConnected]);

  return (
    <Card
      className={cn(
        "mx-6 mb-6 cursor-pointer relative overflow-hidden py-3",
        "bg-slate-900/30 backdrop-blur-md border border-white/10",
        "shadow-2xl shadow-black/20",
        "hover:bg-slate-900/40 hover:border-white/20 transition-all duration-300 ease-out",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Continue quiz: ${title}, ${progress}% complete`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Subtle gradient overlay for enhanced glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-slate-800/10 pointer-events-none" />

      <div className="relative px-6">
        {/* Content - Header and Quiz title on left, Progress on right */}
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Header and Quiz title together */}
          <div className="flex-1 min-w-0">
            <h3 className="text-md font-medium text-white uppercase tracking-wide mb-4">
              Recent Quiz
            </h3>
            <h4 className="text-lg font-semibold text-white leading-tight">
              {info?.quiz.title || "No Recent Quiz"}
            </h4>
          </div>

          {/* Right side - Circular progress */}
          <div className="flex-shrink-0">
            <CircularProgress
              value={number?.score ?? 0}
              size={64}
              className="text-white"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
