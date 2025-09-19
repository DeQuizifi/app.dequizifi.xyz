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
