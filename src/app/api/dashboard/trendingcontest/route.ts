import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const trendingcontest = await prisma.contest.findMany({
      select: {
        name: true,
        registrationEndTime: true,
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        registrationEndTime: "asc",
      },
    });
    if (trendingcontest.length === 0) {
      return NextResponse.json(
        { error: "No Trending Contest Found" },
        { status: 404 }
      );
    }
    const now = Date.now();
    const data = trendingcontest.map((c) => ({
      name: c.name,
      registrationEndTime: c.registrationEndTime,
      hoursLeft: c.registrationEndTime
        ? Math.max(
            0,
            Math.floor(
              (new Date(c.registrationEndTime).getTime() - now) /
                (1000 * 60 * 60)
            )
          )
        : null,
      participantCount: c._count.participants,
    }));
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
