import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const header = await prisma.user.findUnique({
      where: {
        id: "user-1-id",
      },
      select: {
        username: true,
      },
    });
    return NextResponse.json(header);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user header" }, { status: 500 });
  }
}

