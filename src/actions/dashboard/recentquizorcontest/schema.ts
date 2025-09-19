import { z } from "zod";

// Input schema (empty for this endpoint)
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

// Error types
export const ActionErrorType = {
  UNAUTHORIZED: "UNAUTHORIZED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_TOKEN: "INVALID_TOKEN",
  DATABASE_ERROR: "DATABASE_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ActionErrorType =
  (typeof ActionErrorType)[keyof typeof ActionErrorType];

export interface ActionError {
  type: ActionErrorType;
  message: string;
  statusCode: number;
}

// Result types
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: ActionError };
