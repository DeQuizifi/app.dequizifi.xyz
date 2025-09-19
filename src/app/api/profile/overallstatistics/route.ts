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
    });

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 401 });
    }

    const overallstats = await prisma.profileStats.findFirst({
      where: {
        user: {
          is: {
            walletAddress: wallet,
          },
        },
      },
      select: {
        overallPoints: true,
        bestRank: true,
        weekStatus: true,
      },
    });
    if (!overallstats) {
      return NextResponse.json({ error: "No stats found" }, { status: 404 });
    }
    return NextResponse.json({ overallstats }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
