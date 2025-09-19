import "server-only";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma/prisma";
import type { ActionResult, RecentActivityResult } from "./schema";

export async function getRecentQuizOrContestLogic(): Promise<
  ActionResult<RecentActivityResult>
> {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        error: {
          type: "UNAUTHORIZED",
          message: "Authentication token not found",
          statusCode: 401,
        },
      };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return {
        success: false,
        error: {
          type: "INVALID_TOKEN",
          message: "Invalid or expired token",
          statusCode: 401,
        },
      };
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { walletAddress: decoded.wallet },
      select: { id: true },
    });

    if (!user) {
      return {
        success: false,
        error: {
          type: "USER_NOT_FOUND",
          message: "User not found",
          statusCode: 404,
        },
      };
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

    return {
      success: true,
      data: { result },
    };
  } catch (error) {
    console.error("Error in getRecentQuizOrContestLogic:", error);
    return {
      success: false,
      error: {
        type: "INTERNAL_ERROR",
        message: "Internal server error",
        statusCode: 500,
      },
    };
  }
}
