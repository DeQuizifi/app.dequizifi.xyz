import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const trendingContest = await prisma.contest.findMany({
      select: {
        name: true,
        participants: true,
        startTime: true,
      },
      orderBy: {
        startTime: "desc", // highest time to start first
      },
      take: 3,
    });

    const contestsSummary = trendingContest.map((contest) => {
      const timeLeftMs = new Date(contest.startTime).getTime() - Date.now();
      const timeLeftHours = Math.max(
        0,
        Math.round(timeLeftMs / (1000 * 60 * 60))
      );
      return {
        name: contest.name,
        participantCount: Array.isArray(contest.participants)
          ? contest.participants.length
          : 0,
        timeLeftHours,
      };
    });
    return NextResponse.json(contestsSummary);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
