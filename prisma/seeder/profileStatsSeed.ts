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
    {
      overallPoints: 555,
      bestRank: "Gold",
      weekStatus: "Active",
      quizzesWonThisWeek: 3,
      totalQuizzesThisWeek: 6,
      userId: "user-6-id",
      topCategories: {
        create: [
          { category: "Geography", quizzesWon: 2, totalQuizzes: 3 },
          { category: "Science", quizzesWon: 1, totalQuizzes: 3 },
        ],
      },
    },
    {
      overallPoints: 444,
      bestRank: "Bronze",
      weekStatus: "Inactive",
      quizzesWonThisWeek: 1,
      totalQuizzesThisWeek: 2,
      userId: "user-7-id",
      topCategories: {
        create: [{ category: "Sports", quizzesWon: 1, totalQuizzes: 2 }],
      },
    },
    {
      overallPoints: 888,
      bestRank: "Diamond",
      weekStatus: "Active",
      quizzesWonThisWeek: 6,
      totalQuizzesThisWeek: 12,
      userId: "user-8-id",
      topCategories: {
        create: [
          { category: "Technology", quizzesWon: 4, totalQuizzes: 6 },
          { category: "Science", quizzesWon: 2, totalQuizzes: 6 },
        ],
      },
    },
    {
      overallPoints: 321,
      bestRank: "Silver",
      weekStatus: "Inactive",
      quizzesWonThisWeek: 1,
      totalQuizzesThisWeek: 2,
      userId: "user-9-id",
      topCategories: {
        create: [{ category: "Music", quizzesWon: 1, totalQuizzes: 2 }],
      },
    },
    {
      overallPoints: 654,
      bestRank: "Gold",
      weekStatus: "Active",
      quizzesWonThisWeek: 2,
      totalQuizzesThisWeek: 4,
      userId: "user-10-id",
      topCategories: {
        create: [{ category: "Art", quizzesWon: 2, totalQuizzes: 4 }],
      },
    },
    {
      overallPoints: 777,
      bestRank: "Silver",
      weekStatus: "Active",
      quizzesWonThisWeek: 3,
      totalQuizzesThisWeek: 6,
      userId: "user-11-id",
      topCategories: {
        create: [
          { category: "History", quizzesWon: 2, totalQuizzes: 3 },
          { category: "Science", quizzesWon: 1, totalQuizzes: 3 },
        ],
      },
    },
    {
      overallPoints: 222,
      bestRank: "Bronze",
      weekStatus: "Inactive",
      quizzesWonThisWeek: 1,
      totalQuizzesThisWeek: 2,
      userId: "user-12-id",
      topCategories: {
        create: [{ category: "Science", quizzesWon: 1, totalQuizzes: 2 }],
      },
    },
    {
      overallPoints: 555,
      bestRank: "Platinum",
      weekStatus: "Active",
      quizzesWonThisWeek: 4,
      totalQuizzesThisWeek: 8,
      userId: "user-13-id",
      topCategories: {
        create: [
          { category: "Literature", quizzesWon: 2, totalQuizzes: 4 },
          { category: "Science", quizzesWon: 2, totalQuizzes: 4 },
        ],
      },
    },
    {
      overallPoints: 999,
      bestRank: "Gold",
      weekStatus: "Active",
      quizzesWonThisWeek: 5,
      totalQuizzesThisWeek: 10,
      userId: "user-14-id",
      topCategories: {
        create: [
          { category: "Math", quizzesWon: 3, totalQuizzes: 5 },
          { category: "Art", quizzesWon: 2, totalQuizzes: 5 },
        ],
      },
    },
    {
      overallPoints: 333,
      bestRank: "Silver",
      weekStatus: "Inactive",
      quizzesWonThisWeek: 1,
      totalQuizzesThisWeek: 3,
      userId: "user-15-id",
      topCategories: {
        create: [
          { category: "Art", quizzesWon: 1, totalQuizzes: 2 },
          { category: "Math", quizzesWon: 0, totalQuizzes: 1 },
        ],
      },
    },
  ];

  for (const data of profileStatsData) {
    await prisma.profileStats.create({ data });
  }
}

// Note: main() is now called from mainSeeder.ts
