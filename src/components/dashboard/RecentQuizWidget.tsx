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
  quizId: number;
  score: number;
  quiz: {
    title: string;
  };
};

export default function RecentQuizWidget({
  title,
  progress,
  onClick,
  className,
}: RecentQuizWidgetProps) {
  //RecentQuizInformation
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<RecentQuizProps | null>(null);
  const [number, setNumber] = useState<RecentQuizScoreProps | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    // Initialize token from localStorage if available
    if (typeof window !== "undefined") {
      return localStorage.getItem("jwtToken");
    }
    return null;
  });

  // Watch for token changes in localStorage
  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    };

    // Set up an interval to check periodically (for when token is set by login)
    const interval = setInterval(checkToken, 500);

    // Clean up interval
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const fetchrecentquizinfo = async () => {
      if (!isConnected || !address) {
        setError("Can't find user");
        setInfo(null);
        setNumber(null);
        return;
      }
      if (!token) {
        setError("User not logged in");
        setInfo(null);
        setNumber(null);
        return;
      }
      try {
        const [resTitle, resScore] = await Promise.all([
          fetch(`/api/dashboard/recentquiz`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch(`/api/dashboard/recentquizscore`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);
        const [dataTitle, dataScore] = await Promise.all([
          resTitle.json(),
          resScore.json(),
        ]);
        let errorMsg = null;
        console.log(dataTitle, dataScore);
        if (!resTitle.ok && !resScore.ok) {
          errorMsg =
            dataTitle.error || dataScore.error || "Internal Server Error";
          setInfo(null);
          setNumber(null);
        } else {
          setInfo(resTitle.ok ? dataTitle.recentquiz : null);
          setNumber(resScore.ok ? dataScore.recentquiz : null);
        }
        setError(errorMsg);
      } catch (error) {
        console.error(error);
        setError("Internal Server Error");
        setInfo(null);
        setNumber(null);
      }
    };
    fetchrecentquizinfo();
  }, [address, isConnected, token]);

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
              {error
                ? error
                : info?.quiz?.title
                ? info.quiz.title
                : "No Recent Quiz"}
            </h4>
          </div>

          {/* Right side - Circular progress */}
          <div className="flex-shrink-0">
            <CircularProgress
              value={typeof number?.score === "number" ? number.score : 0}
              size={64}
              className="text-white"
            />
            {error && <div className="text-xs text-red-400 mt-2">{error}</div>}
          </div>
        </div>
      </div>
    </Card>
  );
}
