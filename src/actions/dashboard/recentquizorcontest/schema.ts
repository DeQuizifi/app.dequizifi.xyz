import { z } from "zod";

// Input schema (empty for this endpoint - no parameters needed)
export const getRecentQuizOrContestSchema = z.object({});

// Output types
export interface QuizResult {
  quizId: number;
  createdAt: Date;
  quiz: {
    title: string;
  };
}

export interface ContestResult {
  joinedAt: Date;
  contest: {
    name: string;
  };
}

export interface RecentActivityResult {
  result: QuizResult | ContestResult | null;
}

export type GetRecentQuizOrContestInput = z.infer<
  typeof getRecentQuizOrContestSchema
>;
