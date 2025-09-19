import "server-only";

import prisma from "@/lib/prisma";
import { Result, success, error } from "@/lib/result";
import type {
  RecentActivityResult,
  GetRecentQuizOrContestInput,
} from "./schema";

export async function getRecentQuizOrContest(
  input: GetRecentQuizOrContestInput,
  userId: string
): Promise<Result<RecentActivityResult>> {
  try {
    // Get user by ID (userId from auth context is user.id, not walletAddress)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return error("User not found");
    }

    // Get recent quiz and contest
    const recentQuiz = await prisma.quizAttempt.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        quizId: true,
        createdAt: true,
        quiz: { select: { title: true } },
      },
    });

    const recentContest = await prisma.contestParticipant.findFirst({
      where: { userId: user.id },
      orderBy: { joinedAt: "desc" },
      select: {
        joinedAt: true,
        contest: { select: { name: true } },
      },
    });

    // Determine most recent
    const quizTime = recentQuiz?.createdAt
      ? new Date(recentQuiz.createdAt).getTime()
      : 0;
    const contestTime = recentContest?.joinedAt
      ? new Date(recentContest.joinedAt).getTime()
      : 0;

    let result = null;
    if (quizTime >= contestTime && recentQuiz) {
      result = recentQuiz;
    } else if (recentContest) {
      result = recentContest;
    }

    return success({ result });
  } catch (err) {
    console.error("Error in getRecentQuizOrContest:", err, { userId });
    return error("Failed to fetch recent quiz or contest");
  }
}
