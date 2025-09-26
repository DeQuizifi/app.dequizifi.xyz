"use client";

import { Progress } from "@/components/ui/progress";

import type { Quiz } from "./QuizzesList";

interface QuizNotJoinedTrendingCardProps {
  quiz: Quiz;
}

import Link from "next/link";

export function QuizNotJoinedTrendingCard({
  quiz,
}: QuizNotJoinedTrendingCardProps) {
  const { quizName, peopleJoined, hoursLeftToStart } = quiz;
  // Calculate progress percentage (assuming max 24 hours) and clamp to [0,100]
  const rawPercent = ((24 - hoursLeftToStart) / 24) * 100;
  const progressValue = Math.min(100, Math.max(0, rawPercent));

  return (
    <Link href={`/play/${quiz.id}`} className="block">
      <div className="relative flex-shrink-0 w-72 h-48 rounded-2xl overflow-hidden bg-[url('/images/playQuizImage.svg')] bg-cover bg-center border-2 border-primary">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-foreground/60" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 text-background">
          {/* Quiz Name */}
          <div>
            <h3 className="text-xl font-bold leading-tight">{quizName}</h3>
          </div>

          {/* Bottom section with people joined and time left */}
          <div className="space-y-3">
            {/* People joined */}
            <p className="text-sm font-medium">{peopleJoined} people joined</p>

            {/* Hours left */}
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {hoursLeftToStart} Hours Left
              </p>

              {/* Progress bar */}
              <Progress value={progressValue} className="w-full h-2 bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
