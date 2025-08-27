import jwt from "jsonwebtoken";

// Resolve and validate the JWT secret once at module load
const SECRET_ENV = process.env.JWT_SECRET;
if (!SECRET_ENV || !SECRET_ENV.trim()) {
  // Fail fast with a descriptive message to avoid signing/verifying with undefined
  throw new Error(
    "JWT_SECRET is not set. Define it in the server environment."
  );
}
const SECRET = SECRET_ENV;

// Create JWT with wallet address
export function signToken(wallet: string) {
  // Align with cookie Max-Age (7 days). Consider short-lived access + refresh in future.
  return jwt.sign({ wallet }, SECRET, { expiresIn: "7d" });
}

// Verify and decode JWT
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { wallet: string };
  } catch {
    return null;
  }
}
