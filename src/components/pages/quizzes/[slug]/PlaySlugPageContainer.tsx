"use client";

import { Suspense } from "react";
import { QuizSlugTabs } from "../components/QuizSlugTabs";
import { QuizDetailsCard } from "@/components/models/quiz/QuizDetailsCard";
import { PlaySlugLoading } from "../PlaySlugLoading";

export function PlaySlugPageContainer() {
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <Suspense fallback={<PlaySlugLoading />}>
        <QuizDetailsCard />
        <QuizSlugTabs />
      </Suspense>
    </div>
  );
}
