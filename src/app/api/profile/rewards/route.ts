import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/token=([^;]+)/);
  const token = match ? match[1] : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Token is expired" }, { status: 401 });
  }
  const wallet = decoded.wallet;

  try {
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: wallet,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    const userrewards = await prisma.rewards.findFirst({
      where: {
        user: {
          is: {
            walletAddress: wallet,
          },
        },
      },
      select: {
        xpLevel: true,
        xpPointsToNext: true,
        rank: true,
        nextRankUnlockLevel: true,
        points: true,
        trophies: true,
      },
    });
    if (!userrewards) {
      return NextResponse.json({ error: "Rewards Not Found" }, { status: 404 });
    }
    return NextResponse.json({ userrewards }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
