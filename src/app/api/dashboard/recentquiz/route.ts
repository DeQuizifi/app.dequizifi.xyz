import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  
  const authHeader = req.headers.get("authorization")
  if(!authHeader?.startsWith("Bearer ")){
    return NextResponse.json({error:"Unauthorized"},{status: 401})
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if(!decoded){
    return NextResponse.json({error:"Invalid or expired token"},{status:401})
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
      orderBy:{
        createdAt: "desc",
      },
      select:{
        quizId: true,
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
