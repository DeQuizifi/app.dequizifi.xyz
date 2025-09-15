"use client";

import React, { useEffect, useState } from "react";
import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardBody from "./LeaderboardBody";

export default function LeaderboardContainer() {
  const [activeTab, setActiveTab] = useState<"week" | "allTime">("week");
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const hoursInDay = now.getHours();
      const minutesInHour = now.getMinutes();
      const secondsInMinute = now.getSeconds();

      const daysRemaining = 7 - dayOfWeek;
      const hoursRemaining = 24 - hoursInDay - 1;
      const minutesRemaining = 60 - minutesInHour - 1;
      const secondsRemaining = 60 - secondsInMinute;

      setTimeRemaining(
        `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`
      );
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-[-1.5rem] rounded-t-3xl p-6 min-h-[600px] font-mono overflow-hidden bg-gradient-to-b from-background via-primary to-card">
      <h2 className="text-foreground text-2xl font-bold mb-6">Leaderboard</h2>
      <LeaderboardHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeRemaining={timeRemaining}
      />
      <LeaderboardBody activeTab={activeTab} />
    </div>
  );
}
