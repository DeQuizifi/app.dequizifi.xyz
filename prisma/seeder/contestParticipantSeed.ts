import { PrismaClient } from "../../src/generated/prisma";

export async function main(prisma: PrismaClient) {
  // Ensure every user joins each contest up to 3 times
  const users = await prisma.user.findMany({ select: { id: true } });
  const contests = await prisma.contest.findMany({ select: { id: true } });

  if (users.length === 0 || contests.length === 0) {
    console.warn("contestParticipantSeed: no users or contests; skipping.");
    return;
  }

  // Each user can attempt each contest a random number of times (0-3)
  const data: { id: string; contestId: string; userId: string }[] = [];
  let idCounter = 1;
  contests.forEach((contest) => {
    users.forEach((user) => {
      const attempts = Math.floor(Math.random() * 4); // 0, 1, 2, or 3
      for (let attempt = 1; attempt <= attempts; attempt++) {
        data.push({
          id: `cp-${idCounter}`,
          contestId: contest.id,
          userId: user.id,
        });
        idCounter++;
      }
    });
  });

  await prisma.contestParticipant.createMany({ data });
}
