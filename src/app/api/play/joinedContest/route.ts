import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/token=([^;]+)/);
  const token = match ? match[1] : null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorised Access" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Token is expired" }, { status: 401 });
  }

  const wallet = decoded.wallet;
  if (!wallet) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
