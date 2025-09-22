import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const trendingQuiz = await prisma.quiz.findMany({
      include: {
        questions: true,
        attempts: true,
      },
    });

    const result = trendingQuiz
      .map((quiz) => ({
        title: quiz.title,
        numberofquestions: quiz.questions.length,
        numberofattempts: quiz.attempts.length,
      }))
      .sort((a, b) => b.numberofattempts - a.numberofattempts); // Sort by attempts descending

    console.log("Mapped and Sorted Result:", result); // Debugging: Log sorted result

    if (result.length === 0) {
      return NextResponse.json({ error: "No quizzes found" }, { status: 404 });
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trending quizzes:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
