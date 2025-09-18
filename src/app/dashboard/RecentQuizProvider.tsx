"use client";

import React, { useCallback, useEffect, useState } from "react";
import RecentQuizWidget from "@/components/dashboard/RecentQuizWidget";
import { mockRecentQuiz, type RecentQuiz } from "@/lib/data/mockData";

interface RecentQuizProviderProps {
  /** Optional handler when a recent quiz is clicked */
  onQuizClick?: (quizId: string) => void;
}

/**
 * Provides RecentQuizWidget with the latest quiz for the user.
 * Uses mock data here; replace data-loading with real API call when available.
 */
export default function RecentQuizProvider({
  onQuizClick,
}: RecentQuizProviderProps) {
  const [recentQuiz, setRecentQuiz] = useState<RecentQuiz | null>(null);

  // Load mock data once. Keep timeout small to simulate async fetch.
  useEffect(() => {
    const timer = setTimeout(() => setRecentQuiz(mockRecentQuiz), 100);
    return () => clearTimeout(timer);
  }, []);

  // Stable click handler to avoid changing identity on parent re-renders.
  const handleQuizClick = useCallback(() => {
    if (!recentQuiz) return;

    if (typeof onQuizClick === "function") {
      onQuizClick(recentQuiz.id);
      return;
    }

    // Default behavior: log navigation intent. Replace with router push as needed.
    console.log(`Navigate to quiz ${recentQuiz.id}`);
  }, [recentQuiz, onQuizClick]);

  if (!recentQuiz) return null;

  return (
    <RecentQuizWidget
      progress={recentQuiz.progress}
      onClick={handleQuizClick}
    />
  );
}
