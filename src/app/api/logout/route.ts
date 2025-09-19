import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await getSession();
    // Remove user from session and save
    delete session.user;
    await session.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
