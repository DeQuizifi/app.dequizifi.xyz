import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try{
        const {searchParams} = new URL(req.url);
        const walletAddress = searchParams.get("address");
    
        if(!walletAddress){
            return NextResponse.json({error:"Wallet Not Found"},{status: 401});
        }
    
        const user = await prisma.user.findUnique({
          where: {
            walletAddress: walletAddress,
          },
        });
        
        if (!user) {
          return NextResponse.json({ error: "User Not Found" }, { status: 404 });
        }

        const userrewards = await prisma.rewards.findFirst({
            where:{
                user:{
                    is:{
                        walletAddress: walletAddress
                    },
                },
            },
            select:{
                xpLevel:true,
                xpPointsToNext:true,
                rank:true,
                nextRankUnlockLevel:true,
                points:true,
                trophies:true,
            }
        });
        if(!userrewards){
            return NextResponse.json({error:"Rewards Not Found"},{status: 404})
        }
        return NextResponse.json({userrewards},{status: 200})
    }catch(error){
        console.error(error);
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}