import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie")|| "";
  const match = cookieHeader.match(/token=([^;]+)/);
  const token = match? match[1]: null;
  if(!token){
    return NextResponse.json({error:"Unauthorised"},{status: 401})
  }
  const decoded = verifyToken(token);
  if(!decoded){
    return NextResponse.json({error:"Token is expired"},{status: 401})
  }
  const wallet = decoded.wallet

  try{
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: wallet,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    const userStats = await prisma.profileStats.findFirst({
      where: {
        user: {
          is: {
            walletAddress: wallet,
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
