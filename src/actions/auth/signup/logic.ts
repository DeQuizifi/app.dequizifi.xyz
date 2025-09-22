import "server-only";

import prisma from "@/lib/prisma";
import { error, Result, success } from "@/lib/result";
import { getSession } from "@/lib/session";
import { SignupInput } from "./schema";

interface User {
  id: string;
  username: string;
  walletAddress: string | null;
  joinedDate: Date;
}

export async function signup(input: SignupInput): Promise<Result<User>> {
  const { walletAddress } = input;
  const normalisedWalletAddress = walletAddress.trim().toLowerCase();

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { walletAddress: normalisedWalletAddress },
  });

  if (existingUser) {
    console.error("Signup error: User with this wallet address already exists");
    return error("User with this wallet address already exists");
  }

  // Create user with user-friendly username
  // Generate a default username (e.g., user_<first6_of_wallet>)
  const defaultUsername = `user_${normalisedWalletAddress.slice(2, 8)}`;

  // Ensure username is unique
  let uniqueUsername = defaultUsername;
  let suffix = 1;
  while (
    await prisma.user.findUnique({ where: { username: uniqueUsername } })
  ) {
    uniqueUsername = `${defaultUsername}_${suffix}`;
    suffix++;
  }

  const user = await prisma.user.create({
    data: {
      username: uniqueUsername,
      walletAddress: normalisedWalletAddress,
    },
    select: {
      id: true,
      username: true,
      walletAddress: true,
      joinedDate: true,
    },
  });

  const session = await getSession();
  session.user = { id: user.id };
  await session.save();

  return success(user);
}
