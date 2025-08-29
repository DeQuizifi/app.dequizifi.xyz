import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let walletAddress;
    try {
      const body = await req.json();
      walletAddress = body.walletAddress;
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or empty JSON body" },
        { status: 400 }
      );
    }

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Missing Wallet Address" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        walletAddress,
      },
      select: {
        balance: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json({ balance: user.balance }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user balance" },
      { status: 500 }
    );
  }
}
