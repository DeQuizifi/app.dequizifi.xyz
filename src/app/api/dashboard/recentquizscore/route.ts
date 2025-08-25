import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
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
      orderBy:{
        createdAt: "desc",
      },
      select:{
        quizId: true,
        score:true,
        quiz:{
            select:{
                title:true,
            }
        }
      }
    });
    return NextResponse.json({ recentquiz });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
