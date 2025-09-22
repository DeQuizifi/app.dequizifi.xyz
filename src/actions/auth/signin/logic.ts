import "server-only";

import prisma from "@/lib/prisma";
import { Result, success } from "@/lib/result";
import { SigninInput } from "./schema";
import { getSession } from "@/lib/session";

type UserWithoutSensitiveData = {
  id: string;
  username: string;
  walletAddress: string | null;
  joinedDate: Date;
  favQuizTopic: string | null;
};

export async function signin(
  input: SigninInput
): Promise<Result<UserWithoutSensitiveData>> {
  const { walletAddress } = input;
  const normalisedWalletAddress = walletAddress.toLowerCase();

  // Find user by wallet address
  let user = await prisma.user.findUnique({
    where: { walletAddress: normalisedWalletAddress },
    select: {
      id: true,
      username: true,
      walletAddress: true,
      joinedDate: true,
      favQuizTopic: true,
    },
  });

  // If user doesn't exist, create a new one with default username
  if (!user) {
    // Generate a default username (e.g., user_<first6_of_wallet>)
    const defaultUsername = `user_${normalisedWalletAddress.slice(2, 8)}`;

    // Ensure username is unique (rare collision, but check)
    let uniqueUsername = defaultUsername;
    let suffix = 1;
    while (
      await prisma.user.findUnique({ where: { username: uniqueUsername } })
    ) {
      uniqueUsername = `${defaultUsername}_${suffix}`;
      suffix++;
    }

    user = await prisma.user.create({
      data: {
        username: uniqueUsername,
        walletAddress: normalisedWalletAddress,
      },
      select: {
        id: true,
        username: true,
        walletAddress: true,
        joinedDate: true,
        favQuizTopic: true,
      },
    });
  }

  // Set session
  const session = await getSession();
  session.user = { id: user.id };
  await session.save();

  return success(user);
}
