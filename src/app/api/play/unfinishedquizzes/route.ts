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
    const getunfinishedquiz = await prisma.quizAttempt.findMany({
      where: {
        user: {
          walletAddress: wallet,
        },
        isFinished: false,
      },
      select: {
        id: true,
        progress: true,
        quiz: {
          select: {
            id: true,
            title: true,
            _count: {
              select: {
                questions: true,
              },
            },
          },
        },
      },
    });
    if (!getunfinishedquiz || getunfinishedquiz.length === 0) {
      return NextResponse.json(
        { error: "Could not find any unfinished quiz" },
        { status: 404 }
      );
    }
    console.log(getunfinishedquiz);
    return NextResponse.json(getunfinishedquiz, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
