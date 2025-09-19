"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getRecentQuizOrContest } from "@/actions/dashboard/recentquizorcontest/action";
import { CircularProgress } from "./circular-progress";
import type {
  ActionResult,
  RecentActivityResult,
} from "@/actions/dashboard/recentquizorcontest/schema";

interface RecentQuizWidgetProps {
  progress: number;
  onClick?: () => void;
  className?: string;
}

export default function RecentQuizWidget({
  progress,
  onClick,
}: RecentQuizWidgetProps) {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RecentActivityResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    const interval = setInterval(checkToken, 500);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const fetchRecent = async () => {
      if (!isConnected || !address) {
        setError("Wallet not connected");
        setData(null);
        setIsLoading(false);
        return;
      }
      if (!token) {
        setError("User not logged in");
        setData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const result: ActionResult<RecentActivityResult> =
          await getRecentQuizOrContest();

        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error.message);
          setData(null);
        }
      } catch (error) {
        console.error(error);
        setError("Internal Server Error");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecent();
  }, [address, isConnected, token]);

  const getDisplayData = () => {
    if (error) {
      return {
        title: "Recent Activity",
        subtitle: error,
        isError: true,
      };
    }

    if (isLoading) {
      return {
        title: "Recent Activity",
        subtitle: "Loading...",
        isError: false,
      };
    }

    if (!data?.result) {
      return {
        title: "Recent Activity",
        subtitle: "No Recent Activity",
        isError: false,
      };
    }

    // Check if it's a quiz result (has quiz property)
    if ("quiz" in data.result) {
      return {
        title: "Recent Quiz",
        subtitle: data.result.quiz.title,
        isError: false,
      };
    }

    // Otherwise it's a contest result
    if ("contest" in data.result) {
      return {
        title: "Recent Contest",
        subtitle: data.result.contest.name,
        isError: false,
      };
    }

    return {
      title: "Recent Activity",
      subtitle: "No Recent Activity",
      isError: false,
    };
  };

  const displayData = getDisplayData();
  const hasQuizProgress = data?.result && "quiz" in data.result;

  return (
    <Card
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={
        hasQuizProgress
          ? `Continue quiz: ${displayData.subtitle}, ${progress}% complete`
          : displayData.isError
          ? `Error: ${displayData.subtitle}`
          : `View: ${displayData.subtitle}`
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Subtle gradient overlay for enhanced glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-muted/10 pointer-events-none" />

      <div className="relative px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-md font-medium uppercase tracking-wide mb-4">
              {displayData.title}
            </h3>
            <h4 className="text-lg font-semibold text-foreground leading-tight">
              {displayData.subtitle}
            </h4>
            {/* No need to print joined/attempted time */}
          </div>
          <div className="flex-shrink-0">
            <CircularProgress value={hasQuizProgress ? progress : 0} />
            {displayData.isError && (
              <div className="text-xs text-destructive mt-2">
                {displayData.subtitle}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
