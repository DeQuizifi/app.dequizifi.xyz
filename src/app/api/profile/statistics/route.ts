import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("address");

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet Not Found" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        walletAddress: walletAddress,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    const userStats = await prisma.profileStats.findFirst({
      where: {
        user: {
          is: {
            walletAddress: walletAddress,
          },
        },
      },
      select:{
        //Total quiz won and Total quiz attended
        quizzesWonThisWeek:true,
        totalQuizzesThisWeek:true,
        topCategories:{
            select:{
                //Quiz won in that particular category and Quiz Attended in that particular category
                category:true,
                quizzesWon:true,
                totalQuizzes:true
            }
        }
      }
    });
    if(!userStats){
        return NextResponse.json({error:"Unable to find Statistics"},{status: 404})
    }
    return NextResponse.json({userStats},{status: 200})
  } catch(error){
    console.error(error)
    return NextResponse.json({error:"Internal Server Error"},{status: 500})
  }
}
