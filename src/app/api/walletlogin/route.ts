import { signToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//Extacting the username from farcaster account
export async function getFarcasterUsername(walletAddress: string) {
  const res = await fetch(
    `https://api.farcaster.xyz/users/byWallet/${walletAddress}`
  );

  if (!res.ok) return null;
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
    return NextResponse.json(
      { error: "Missing Wallet Address" },
      { status: 400 }
    );
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

  // ✅ Issue JWT inside the function
  const token = signToken(walletAddress);

  // Set HttpOnly cookie with JWT
  const response = NextResponse.json({ success: true, user }, { status: 200 });
  response.headers.append(
    "Set-Cookie",
    `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
  );
  return response;
}
