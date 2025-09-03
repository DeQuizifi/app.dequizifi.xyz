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
