import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalPoints = await prisma.profileStats.findMany({
      where: { overallPoints: { gt: 0 } },
      orderBy: { overallPoints: "desc" },
      include: { user: true },
    });

    // Map overallPoints to points for each entry
    const mapped = totalPoints.map((entry) => ({
      ...entry,
      points: entry.overallPoints,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch overall points" },
      { status: 500 }
    );
  }
}
