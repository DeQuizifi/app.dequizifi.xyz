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
      let timeLeftHours = 0;
      const startTimestamp = Date.parse(String(contest.startTime));
      if (!isNaN(startTimestamp)) {
        timeLeftHours = Math.max(
          0,
          Math.round((startTimestamp - Date.now()) / (1000 * 60 * 60))
        );
      } else {
        console.warn("Invalid startTime for contest:", contest.startTime);
        timeLeftHours = 0;
      }
      return {
        ...contest,
        timeLeftHours,
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
