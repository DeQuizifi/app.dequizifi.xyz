import { PrismaClient } from "../../src/generated/prisma";

export async function main(prisma: PrismaClient) {
  const profileStatsData = [
    {
      overallPoints: 222,
      bestRank: "Bronze",
      weekStatus: "Active",
      quizzesWonThisWeek: 2,
      totalQuizzesThisWeek: 4,
      userId: "user-1-id",
      topCategories: {
        create: [
          { category: "Science", quizzesWon: 1, totalQuizzes: 2 },
          { category: "Math", quizzesWon: 1, totalQuizzes: 2 },
        ],
      },
    },
    {
      overallPoints: 222,
      bestRank: "Bronze",
      weekStatus: "Active",
      quizzesWonThisWeek: 2,
      totalQuizzesThisWeek: 4,
      userId: "user-2-id",
      topCategories: {
        create: [
          { category: "Science", quizzesWon: 1, totalQuizzes: 2 },
          { category: "Math", quizzesWon: 1, totalQuizzes: 2 },
        ],
      },
    },
    {
      overallPoints: 777,
      bestRank: "Silver",
      weekStatus: "Active",
      quizzesWonThisWeek: 4,
      totalQuizzesThisWeek: 8,
      userId: "user-3-id",
      topCategories: {
        create: [
          { category: "History", quizzesWon: 2, totalQuizzes: 4 },
          { category: "Science", quizzesWon: 2, totalQuizzes: 4 },
        ],
      },
    },
    {
      overallPoints: 333,
      bestRank: "Gold",
      weekStatus: "Inactive",
      quizzesWonThisWeek: 1,
      totalQuizzesThisWeek: 3,
      userId: "user-4-id",
      topCategories: {
        create: [
          { category: "Math", quizzesWon: 1, totalQuizzes: 2 },
          { category: "Science", quizzesWon: 0, totalQuizzes: 1 },
        ],
      },
    },
    {
      overallPoints: 999,
      bestRank: "Platinum",
      weekStatus: "Active",
      quizzesWonThisWeek: 5,
      totalQuizzesThisWeek: 10,
      userId: "user-5-id",
      topCategories: {
        create: [
          { category: "Math", quizzesWon: 3, totalQuizzes: 5 },
          { category: "History", quizzesWon: 2, totalQuizzes: 5 },
        ],
      },
    },
  ];

  for (const data of profileStatsData) {
    await prisma.profileStats.create({ data });
  }
}

// Note: main() is now called from mainSeeder.ts
