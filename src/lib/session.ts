import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { cookieName, IS_PRODUCTION } from "./constants";

const AUTH_SECRET =
  process.env.IRON_SESSION_PASSWORD || process.env.AUTH_SECRET || "";
if (!AUTH_SECRET) {
  throw new Error(
    "IRON_SESSION_PASSWORD or AUTH_SECRET environment variable is not set."
  );
}

export type SessionData = {
  user?: {
    id: string;
  };
};

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), {
    password: AUTH_SECRET,
    cookieName: cookieName,
    cookieOptions: {
      secure: IS_PRODUCTION,
      httpOnly: true,
    },
  });

  return session;
}
