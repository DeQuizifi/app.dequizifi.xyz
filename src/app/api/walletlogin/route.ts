import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

//Extacting the username from farcaster account
export async function getFarcasterUsername(walletAddress: string){
   const res = await fetch(`https://api.farcaster.xyz/users/byWallet/${walletAddress}`);

   if(!res.ok) return null;
   const data = await res.json();
   return data.username;

}

// Simple random username generator(just for now)
function generateUsername() {
  const adjectives = ["Happy", "Cool", "Fast", "Smart", "Brave"];
  const nouns = ["Tiger", "Fox", "Wizard", "Dragon", "Ninja"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}

export async function POST(req: Request) {
  const { walletAddress } = await req.json();

  if (!walletAddress) {
    return NextResponse.json({ error: "Missing Wallet Address" }, { status: 400 });
  }

  // Check if user exists
  let user = await prisma.user.findUnique({
    where: { walletAddress },
  });

  // If not, create a new user
  if (!user) {
    user = await prisma.user.create({
      data: {
        walletAddress,
        username: generateUsername(), // auto-generate username
        balance: 0,
      },
    });
  }

  return NextResponse.json({ success: true, user }, { status: 200 });
}
