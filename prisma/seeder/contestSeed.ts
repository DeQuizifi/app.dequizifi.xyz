import { PrismaClient } from "../../src/generated/prisma";

export async function main(prisma: PrismaClient) {
  // Create contests with the same name as the quiz title, one per quiz
  const quizzes = await prisma.quiz.findMany({
    select: { id: true, title: true },
  });
  // Create contests with random time limits and start/end times
  const timeLimits = [12, 16, 24, 48]; // hours
  const contestData = quizzes.map((quiz, idx) => {
    // Randomly pick a time limit for each contest
    const timeLimit = timeLimits[Math.floor(Math.random() * timeLimits.length)];
    // Start time: staggered by idx, some in future, some in past
    const startOffset = ((idx % 4) - 2) * 3600 * 1000; // -2, -1, 0, 1 hours
    const startTime = new Date(Date.now() + startOffset);
    const endTime = new Date(startTime.getTime() + timeLimit * 3600 * 1000);
    return {
      id: `contest-${quiz.id}-id`,
      name: quiz.title,
      quizId: quiz.id,
      startTime,
      endTime,
      // Optionally, you can add timeLeftToStart and timeLeftToEnd for clarity
      // timeLeftToStart: Math.max(0, startTime.getTime() - Date.now()),
      // timeLeftToEnd: Math.max(0, endTime.getTime() - Date.now()),
    };
  });
  await prisma.contest.createMany({ data: contestData });
}
