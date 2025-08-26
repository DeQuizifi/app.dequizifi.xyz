import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!; // keep this safe in .env

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
