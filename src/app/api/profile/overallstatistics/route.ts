import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try{

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
          return NextResponse.json({ error: "User Not Found" }, { status: 401 });
        }

        const overallstats = await prisma.profileStats.findFirst({
            where:{
                user:{
                    is:{
                        walletAddress:walletAddress
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
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
      }
    }
