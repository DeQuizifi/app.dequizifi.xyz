'use client';

import React, { useState, useEffect } from "react";
import { QuizCard } from "./QuizCard";
import { Skeleton } from "../../ui/skeleton";

import { mockQuizzes, Quiz } from "./mockQuizzes";

const QuizCardSkeleton = () => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
    <div className="flex flex-col space-y-1.5 pb-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="flex items-center justify-between pt-0">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>
  </div>
);

export function QuizTrendingList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuizzes(mockQuizzes);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  const handlePlayNow = (id: number) => {
    console.log(`Playing quiz with ID: ${id}`);
    // Implement navigation or other logic here
  };

  return (
    <div className="mt-4">
      <h3 className="mx-4 mb-4 text-lg font-semibold text-primary-foreground">
        Trending Contests
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <QuizCardSkeleton key={index} />
            ))
          : quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onButtonClick={handlePlayNow} />
            ))}
      </div>
    </div>
  );
}
