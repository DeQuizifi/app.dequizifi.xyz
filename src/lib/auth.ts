import { createHash } from "crypto";
import prisma from "./prisma";
import { getSession } from "./session";
import { cookieName } from "./constants";

export { cookieName as COOKIE_NAME };

export function hashNonce(nonce: string) {
  return createHash("sha256").update(nonce).digest("hex");
}



// Get current user from Iron Session
export async function getCurrentUserFromSession() {
  try {
    const session = await getSession();
    if (!session.user?.id) return null;

    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });
    return user ?? null;
  } catch {
    return null;
  }
}

export async function getCurrentUserIdFromSession(): Promise<string | null> {
  try {
    const session = await getSession();
    return session.user?.id ?? null;
  } catch {
    return null;
  }
}
