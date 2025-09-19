import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await getSession();
  const wallet = session.user?.id;
  if (!wallet) {
    return NextResponse.json({ error: "Unauthorised Access" }, { status: 401 });
  }

  try {
    const joinedContest = await prisma.contestParticipant.findMany({
      where: {
        user: {
          walletAddress: wallet,
        },
      },
      select: {
        contest: {
          select: {
            name: true,
            startTime: true,
            _count: {
              select: {
                participants: true,
              },
            },
          },
        },
      },
    });
    // Calculate time left for each contest
    const timetobegincontest = joinedContest.map((item) => {
      const contest = item.contest;
      const timeleftinhours = Math.max(
        0,
        Math.floor(
          (new Date(contest.startTime).getTime() - Date.now()) /
            (1000 * 60 * 60)
        )
      );
      return {
        ...contest,
        timeleftinhours,
      };
    });
    return NextResponse.json(timetobegincontest);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
