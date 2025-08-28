import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try{
        const {searchParams} = new URL(req.url);
        const walletAddress = searchParams.get("address");

        if(!walletAddress){
            return NextResponse.json({error:"Address Missing"},{status: 400})
        }

        const user = await prisma.user.findUnique({
            where:{
                walletAddress: walletAddress,
            },
            select:{
               username:true,
               walletAddress: true,
               joinedDate: true,
               favQuizTopic:true,
            }
        });
        if (!user){
            return NextResponse.json({error:"User not found"},{status: 404})
        }
        return NextResponse.json({user},{status:200})

    }catch(error){
        console.error(error);
        return NextResponse.json({error:"Internal Server Error"},{status: 500})
    }
}