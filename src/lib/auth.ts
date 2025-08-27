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
  return jwt.sign({ wallet }, SECRET, { expiresIn: "1h" }); // token expires in 1 hour
}

// Verify and decode JWT
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { wallet: string };
  } catch {
    return null;
  }
}
