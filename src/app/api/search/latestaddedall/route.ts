import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fetchlatestquiz = await prisma.quiz.findMany({
      select: {
        title: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const fetchlatestcontest = await prisma.contest.findMany({
      select: {
        name: true,
        createdAt: true,
        startTime: true,
        _count: {
          select: {
            participants: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map to unified format
    const quizItems = fetchlatestquiz.map((q) => ({
      type: "quiz",
      title: q.title,
      createdAt: q.createdAt,
      questionsCount: q._count.questions,
      attemptsCount: q._count.attempts,
    }));

    const contestItems = fetchlatestcontest.map((c) => ({
      type: "contest",
      name: c.name,
      createdAt: c.createdAt,
      startTime: c.startTime,
      participantsCount: c._count.participants,
    }));

    // Merge and sort
    const allItems = [...quizItems, ...contestItems].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (allItems.length === 0) {
      return NextResponse.json(
        { error: "No Quiz or Contest found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ items: allItems }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
