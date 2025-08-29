import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie")||"";
  const match = cookieHeader.match(/token=([^;]+)/);
  const token= match ? match[1] : null;
  if(!token){
    return NextResponse.json({error:"Unauthorised"},{status: 401})
  }
  const decoded = verifyToken(token);
  if(!decoded){
    return NextResponse.json({error:"Token is eXpired"},{status: 401})
  }
  const wallet = decoded.wallet
    try{
        const user = await prisma.user.findUnique({
          where: {
            walletAddress: wallet,
          },
        });
      
        if (!user) {
          return NextResponse.json({ error: "User Not Found" }, { status: 401 });
        }

        const overallstats = await prisma.profileStats.findFirst({
            where:{
                user:{
                    is:{
                        walletAddress:wallet
                    }
                }
            },
            select:{
                overallPoints:true,
                bestRank: true,
                weekStatus: true,
            }
        });
        if(!overallstats){
            return NextResponse.json({error:"No stats found"},{status: 404})
        }
        return NextResponse.json({overallstats},{status: 200});
      }catch(error){
        console.error(error)
        return NextResponse.json({error:"Internal Server Error"},{status: 500});
      }
    }
