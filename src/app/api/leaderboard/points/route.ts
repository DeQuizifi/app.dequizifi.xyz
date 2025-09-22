import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
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
