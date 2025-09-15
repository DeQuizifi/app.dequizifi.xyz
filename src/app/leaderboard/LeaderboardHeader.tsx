"use client";

import React from "react";

interface Props {
  activeTab: "week" | "allTime";
  setActiveTab: (t: "week" | "allTime") => void;
  timeRemaining: string;
}

export default function LeaderboardHeader({
  activeTab,
  setActiveTab,
  timeRemaining,
}: Props) {
  return (
    <div className="mb-6">
      <div className="flex border-b border-border">
        <button
          className={`pb-2 px-4 text-base transition-colors ${
            activeTab === "week"
              ? "text-foreground font-semibold border-b-2 border-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("week")}
          aria-label="View this week's leaderboard"
        >
          This week
        </button>
        <button
          className={`pb-2 px-4 text-base transition-colors ${
            activeTab === "allTime"
              ? "text-foreground font-semibold border-b-2 border-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("allTime")}
          aria-label="View all time leaderboard"
        >
          All time
        </button>
      </div>

      {activeTab === "week" && (
        <div className="flex items-center mt-2 text-muted-foreground text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span aria-label="Time remaining in the week">{timeRemaining}</span>
        </div>
      )}
    </div>
  );
}
