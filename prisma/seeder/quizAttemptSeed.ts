import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient();

export async function main() {
  // Simulate attempts for quizzes by users
  // Generate a large number of attempts for all quizzes (IDs 1-12)
  // Fetch existing user and quiz IDs from the database
  const users = await prisma.user.findMany({ select: { id: true } });
  const quizzes = await prisma.quiz.findMany({ select: { id: true } });

  const userIds = users.map((u) => u.id);
  const quizIds = quizzes.map((q) => q.id);

  if (userIds.length === 0 || quizIds.length === 0) {
    throw new Error(
      `Seeding aborted: users=${userIds.length}, quizzes=${quizIds.length}`
    );
  }
  if (process.env.NODE_ENV !== "production") {
    console.log(`Found ${userIds.length} users`);
    console.log(`Found ${quizIds.length} quizzes`);
  }

  const attemptsData = [];

  for (const quizId of quizIds) {
    // Each quiz gets 30 attempts from random users
    for (let i = 0; i < 30; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const score = Math.floor(Math.random() * 100) + 1;
      const won = Math.random() < 0.5;
      const progress = Math.floor(Math.random() * 101); // 0-100
      const isFinished = progress === 100;
      attemptsData.push({ userId, quizId, score, won, progress, isFinished });
    }
  }

  for (const data of attemptsData) {
    await prisma.quizAttempt.create({
      data: {
        userId: data.userId,
        quizId: data.quizId,
        score: data.score,
        won: data.won,
        progress: data.progress,
        isFinished: data.isFinished,
      },
    });
  }

  console.log("Quiz attempts seeded successfully.");
}

// Note: main() is now called from mainSeeder.ts
