import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { search } = Object.fromEntries(new URL(req.url).searchParams);
    const quizzes = await prisma.quiz.findMany({
      where: search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                category: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      select: {
        id: true,
        title: true,
        category: true,
        createdAt: true,
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
    });
    if (quizzes.length === 0) {
      return NextResponse.json({ error: "No quizzes found" }, { status: 404 });
    }
    return NextResponse.json({ quiz: quizzes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
