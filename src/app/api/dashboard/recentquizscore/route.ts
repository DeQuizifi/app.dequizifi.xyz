import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  // Read JWT from Authorization header (preferred) or cookie
  const authHeader = req.headers.get("authorization") || "";
  const tokenFromHeader = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;
  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get("token")?.value ?? null;
  const token = tokenFromHeader ?? tokenFromCookie;
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
        score: true,
        quiz: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ recentquiz });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
