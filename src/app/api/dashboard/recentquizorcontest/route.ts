import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Read JWT from cookie
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/token=([^;]+)/);
  const token = match ? match[1] : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
  const wallet = decoded.wallet;
  try {
    const username = await prisma.user.findUnique({
      where: {
        walletAddress: wallet,
      },
      select: {
        id: true,
      },
    });
    if (!username) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const recentquiz = await prisma.quizAttempt.findFirst({
      where: {
        userId: username.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        quizId: true,
        createdAt: true,
        quiz: {
          select: {
            title: true,
          },
        },
      },
    });
    const recentContest = await prisma.contestParticipant.findFirst({
      where: {
        userId: username.id
      },
      orderBy: {
        joinedAt: "desc"
      },
      select: {
        joinedAt:true,
        contest: {
          select: {
            name: true,
          }
        }
      }
    });

    const quizTime = recentquiz?.createdAt ? new Date(recentquiz.createdAt).getTime() : 0;
    const contestTime = recentContest?.joinedAt ? new Date(recentContest.joinedAt).getTime() : 0;

    let result;
    if (quizTime >= contestTime) {
      result = recentquiz;
    } else {
      result = recentContest;
    }

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
