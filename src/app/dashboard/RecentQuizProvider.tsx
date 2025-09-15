"use client";

import RecentQuizWidget from "@/components/dashboard/RecentQuizWidget";
import { mockRecentQuiz, type RecentQuiz } from "@/lib/data/mockData";
import { useEffect, useState } from "react";

interface RecentQuizProviderProps {
  onQuizClick?: (quizId: string) => void;
}

export default function RecentQuizProvider({
  onQuizClick,
}: RecentQuizProviderProps) {
  const [recentQuiz, setRecentQuiz] = useState<RecentQuiz | null>(null);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setRecentQuiz(mockRecentQuiz);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleQuizClick = () => {
    if (recentQuiz && onQuizClick) {
      onQuizClick(recentQuiz.id);
    } else if (recentQuiz) {
      // Default behavior if no custom handler provided
      console.log(`Navigate to quiz ${recentQuiz.id}`);
    }
  };

  if (!recentQuiz) {
    return null;
  }

  return (
    <RecentQuizWidget
      progress={recentQuiz.progress}
      onClick={handleQuizClick}
    />
  );
}
