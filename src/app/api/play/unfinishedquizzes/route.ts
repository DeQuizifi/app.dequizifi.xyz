import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  const wallet = session.user?.id;
  if (!wallet) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const unfinishedQuizzes = await prisma.quizAttempt.findMany({
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
    if (!unfinishedQuizzes || unfinishedQuizzes.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    if (process.env.NODE_ENV !== "production") {
      console.log(unfinishedQuizzes);
    }
    return NextResponse.json(unfinishedQuizzes, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
