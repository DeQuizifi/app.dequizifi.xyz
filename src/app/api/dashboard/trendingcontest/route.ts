import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const trendingcontest = await prisma.contest.findMany({
      select: {
        name: true,
        registrationEndTimeHours: true,
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        registrationEndTimeHours: "asc",
      },
    });
    if (!trendingcontest) {
      return NextResponse.json(
        { error: "No Trending Contest Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(trendingcontest);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
