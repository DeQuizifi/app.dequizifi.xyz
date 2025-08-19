import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const rewardsData = [
    {
      xpLevel: 4,
      xpPointsToNext: 90,
      xpCurrentPoints: 45,
      rank: "Bronze",
      nextRankUnlockLevel: 5,
      points: 180,
      userId: "user-1-id",
    },
    {
      xpLevel: 5,
      xpPointsToNext: 100,
      xpCurrentPoints: 50,
      rank: "Gold",
      nextRankUnlockLevel: 6,
      points: 200,
      userId: "user-2-id",
    },
    {
      xpLevel: 3,
      xpPointsToNext: 80,
      xpCurrentPoints: 40,
      rank: "Silver",
      nextRankUnlockLevel: 4,
      points: 120,
      userId: "user-3-id",
    },
    {
      xpLevel: 2,
      xpPointsToNext: 60,
      xpCurrentPoints: 20,
      rank: "Bronze",
      nextRankUnlockLevel: 3,
      points: 60,
      userId: "user-4-id",
    },
    {
      xpLevel: 7,
      xpPointsToNext: 150,
      xpCurrentPoints: 90,
      rank: "Platinum",
      nextRankUnlockLevel: 8,
      points: 350,
      userId: "user-5-id",
    },
  ];

  for (const data of rewardsData) {
    await prisma.rewards.create({ data });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
