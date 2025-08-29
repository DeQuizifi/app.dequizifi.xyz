import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      select: {
        id: true,
        title: true,
        category: true,
        createdAt: true,
        questions: true,
        attempts: true,
      },
    });
    if (quizzes.length === 0) {
      return NextResponse.json({ error: "No quizzes found" }, { status: 404 });
    }
    return NextResponse.json({ quiz: quizzes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
