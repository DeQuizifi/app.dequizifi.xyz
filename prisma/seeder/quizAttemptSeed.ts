import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Simulate attempts for quizzes by users
  // Generate a large number of attempts for all quizzes (IDs 1-12)
  const userIds = [
    "user-1-id",
    "user-2-id",
    "user-3-id",
    "user-4-id",
    "user-5-id",
  ];
  const quizIds = Array.from({ length: 12 }, (_, i) => i + 1);
  const attemptsData = [];

  for (const quizId of quizIds) {
    // Each quiz gets 30 attempts from random users
    for (let i = 0; i < 30; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const score = Math.floor(Math.random() * 100) + 1;
      const won = Math.random() < 0.5;
      attemptsData.push({ userId, quizId, score, won });
    }
  }

  for (const data of attemptsData) {
    await prisma.quizAttempt.create({
      data: {
        userId: data.userId,
        quizId: data.quizId,
        score: data.score,
        won: data.won,
      },
    });
  }

  console.log("Quiz attempts seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1; // ensure finally runs and connections are closed
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
