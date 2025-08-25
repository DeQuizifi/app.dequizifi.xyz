import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SiweMessage } from "siwe";
import prisma from "@/lib/prisma/prisma";

// Simple random username generator
function generateUsername() {
  const adjectives = ["Happy", "Cool", "Fast", "Smart", "Brave"];
  const nouns = ["Tiger", "Fox", "Wizard", "Dragon", "Ninja"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}

export async function POST(req: Request) {
  try {
    const { message, signature, fid, username } = await req.json();
    const cookieStore = await cookies();
    const expectedNonce = cookieStore.get("siwe_nonce")?.value;

    if (!message || !signature || !expectedNonce) {
      return NextResponse.json(
        { error: "Missing required fields (or nonce expired)" },
        { status: 400 }
      );
    }

    // Verify the SIWE message
    const siweMessage = new SiweMessage(message);
    const result = await siweMessage.verify({
      signature,
      nonce: expectedNonce,
    });

    if (!result.success) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const walletAddress = siweMessage.address;

    // Check if user exists by wallet address
    let user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    // If not, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress,
          username: username || generateUsername(),
          balance: 0,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          walletAddress: user.walletAddress,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Farcaster auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
