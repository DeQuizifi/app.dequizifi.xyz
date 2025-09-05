import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latestContest = await prisma.contest.findMany({
      select: {
        name: true,
        startTime: true,
        createdAt: true,
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (latestContest.length == +0) {
      return NextResponse.json({ error: "No Contests Found" }, { status: 404 });
    }

    // Calculate time left to begin in hours for each contest
    const contestsWithTimeLeft = latestContest.map((contest) => {
      const timelefttobegin =
        (new Date(contest.startTime).getTime() - Date.now()) / (1000 * 60 * 60); // hours
      return {
        ...contest,
        timelefttobegin,
      };
    });

    return NextResponse.json(contestsWithTimeLeft, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
