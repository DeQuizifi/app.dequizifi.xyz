import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    const {walletAddress} = await req.json()

    if(!walletAddress){
      return NextResponse.json({error: "Missing Wallet Address"},{status:400})
    }
    const user = await prisma.user.findUnique({
      where:{
        walletAddress,
      },
      select:{
        username: true,
      }
    });
     if(!user){
        return NextResponse.json({error: "User Not Found"},{status: 404})
      }
    return NextResponse.json({username: user.username},{status: 200})

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch user header" }, { status: 500 });
  }
}

