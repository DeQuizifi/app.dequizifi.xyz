import { PrismaClient } from "../../src/generated/prisma";

export async function main(prisma: PrismaClient) {
  // Ensure every user joins a different contest and every contest has participants
  const users = await prisma.user.findMany({ select: { id: true } });
  const contests = await prisma.contest.findMany({ select: { id: true } });

  // Assign each user to a contest in round-robin fashion
  const data = users.map((user, idx) => ({
    id: `cp-${idx + 1}`,
    contestId: contests[idx % contests.length].id,
    userId: user.id,
  }));

  // Add extra participants so every contest has at least 2 participants
  if (contests.length > 1 && users.length > 1) {
    contests.forEach((contest, idx) => {
      // Pick a second user for each contest
      const secondUser = users[(idx + 1) % users.length];
      data.push({
        id: `cp-extra-${idx + 1}`,
        contestId: contest.id,
        userId: secondUser.id,
      });
    });
  }

  await prisma.contestParticipant.createMany({ data });
}
