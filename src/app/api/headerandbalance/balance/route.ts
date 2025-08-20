import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const balance = await prisma.user.findUnique({
      where: {
        id: "user-1-id",
      },
      select: {
        balance: true,
      },
    });
    return NextResponse.json(balance);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user balance" }, { status: 500 });
  }
}

