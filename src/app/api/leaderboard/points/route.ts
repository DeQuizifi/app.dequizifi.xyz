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
    const weeklyPoints = await prisma.rewards.findMany({
      where: { points: { gt: 0 } },
      orderBy: { points: "desc" },
      include: { user: true },
    });

    return NextResponse.json(weeklyPoints);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weekly points" },
      { status: 500 }
    );
  }
}
