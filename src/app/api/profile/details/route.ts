import { getSession } from "@/lib/session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await getSession();
  const wallet = session.user?.id;
  if (!wallet) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: wallet,
      },
      select: {
        username: true,
        walletAddress: true,
        joinedDate: true,
        favQuizTopic: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
