import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const weeklyPoints = await prisma.rewards.findMany({
      where: { points: { gt: 0 } },
      orderBy: { points: "desc" },
      include: { user: true },
    });

    return NextResponse.json(weeklyPoints);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch weekly points" }, { status: 500 });
  }
}
