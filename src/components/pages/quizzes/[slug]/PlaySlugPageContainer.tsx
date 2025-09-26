"use client";

import {QuizSlugTabs} from "../components/QuizSlugTabs";
import {QuizDetailsCard} from "@/components/models/quiz/QuizDetailsCard";

export function PlaySlugPageContainer() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <QuizDetailsCard />
      <QuizSlugTabs />
    </div>
  );
}
