"use client";

import { Card } from "@/components/ui/card";
import { CircularProgress } from "./circular-progress";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

interface RecentQuizWidgetProps {
  progress: number;
  onClick?: () => void;
  className?: string;
}

export default function RecentQuizWidget({
  progress,
  onClick,
  className,
}: RecentQuizWidgetProps) {
  //RecentQuizInformation
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  type RecentData = {
    quiz?: { title: string };
    contest?: { name: string };
  } | null;
  const [recent, setRecent] = useState<RecentData>(null);
  const [token, setToken] = useState<string | null>(() => {
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
    const fetchRecent = async () => {
      if (!isConnected || !address) {
        setError("Can't find user");
        setRecent(null);
        return;
      }
      if (!token) {
        setError("User not logged in");
        setRecent(null);
        return;
      }
      try {
        const res = await fetch(`/api/dashboard/recentquizorcontest`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Internal Server Error");
          setRecent(null);
        } else {
          setRecent(data.result || null);
          setError(null);
        }
      } catch (error) {
        console.error(error);
        setError("Internal Server Error");
        setRecent(null);
      }
    };
    fetchRecent();
  }, [address, isConnected, token]);

  return (
    <Card
      className={`mx-6 mb-6 cursor-pointer relative overflow-hidden py-3 bg-[color-mix(in_srgb,var(--card)_8%,rgba(0,0,0,0))] backdrop-blur-md border border-[color-mix(in_srgb,var(--foreground)_10%,rgba(0,0,0,0))] shadow-2xl shadow-black/20 hover:bg-[color-mix(in_srgb,var(--card)_12%,rgba(0,0,0,0))] hover:border-[color-mix(in_srgb,var(--foreground)_20%,rgba(0,0,0,0))] transition-all duration-300 ease-out ${
        className || ""
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={
        recent?.quiz
          ? `Continue quiz: ${recent.quiz.title}, ${progress}% complete`
          : recent?.contest
          ? `View contest: ${recent.contest.name}`
          : `No recent activity`
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Subtle gradient overlay for enhanced glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)_20%] to-[var(--muted)_10%] pointer-events-none" />

      <div className="relative px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-md font-medium text-welcome-foreground uppercase tracking-wide mb-4">
              {recent?.quiz
                ? "Recent Quiz"
                : recent?.contest
                ? "Recent Contest"
                : "Recent Activity"}
            </h3>
            <h4 className="text-lg font-semibold text-foreground leading-tight">
              {error
                ? error
                : recent?.quiz?.title
                ? recent.quiz.title
                : recent?.contest?.name
                ? recent.contest.name
                : "No Recent Activity"}
            </h4>
            {/* No need to print joined/attempted time */}
          </div>
          <div className="flex-shrink-0">
            <CircularProgress value={recent?.quiz ? progress : 0} />
            {error && <div className="text-xs text-destructive mt-2">{error}</div>}
          </div>
        </div>
      </div>
    </Card>
  );
}
