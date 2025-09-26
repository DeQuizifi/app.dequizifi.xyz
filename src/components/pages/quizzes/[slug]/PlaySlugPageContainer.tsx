"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import QuizSlugTabs from "../components/QuizSlugTabs";

interface Quiz {
  id: number;
  quizName: string;
  peopleJoined: number;
  hoursLeftToStart: number;
  description?: string;
}

export function PlaySlugPageContainer() {
  const quiz: Quiz | null = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("selectedQuiz") || "null");
    } catch {
      return null;
    }
  })();

  if (!quiz) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-foreground/20 backdrop-blur-lg rounded-2xl p-6 border border-primary/20 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-base font-bold text-primary-foreground">{quiz.quizName}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" aria-label="Share">
              <Share2 className="h-5 w-5 text-primary-foreground" />
            </Button>
            <Button size="sm" className="rounded-2xl">Join</Button>
          </div>
        </div>
        
        {quiz.description && (
          <p className="text-primary-foreground text-sm leading-relaxed mb-6">{quiz.description}</p>
        )}
        
        <div className="flex items-center gap-6">
          <div className="text-primary-foreground">
            <span className="text-xl font-semibold">{quiz.hoursLeftToStart}</span>
            <span className="text-sm ml-2">hours left</span>
          </div>
          <div className="text-primary-foreground">
            <span className="text-xl font-semibold">{quiz.peopleJoined}</span>
            <span className="text-sm ml-2">People Joined</span>
          </div>
        </div>
      </div>
      <QuizSlugTabs />
    </div>
  );
}
