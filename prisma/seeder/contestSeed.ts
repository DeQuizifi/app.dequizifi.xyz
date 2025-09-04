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
    // Randomly pick hours to add to 5 days for startTime
    const randomHours = Math.floor(Math.random() * 24) + 1; // 1 to 24 hours
    const createdAt = new Date();
    const startTime = new Date(
      createdAt.getTime() + 5 * 24 * 3600 * 1000 + randomHours * 3600 * 1000
    );
    const endTime = new Date(startTime.getTime() + timeLimit * 3600 * 1000);
    // registrationEndTime: random value between createdAt and startTime
    const maxRegHours = Math.floor(
      (startTime.getTime() - createdAt.getTime()) / (3600 * 1000)
    );
    const regHours = Math.floor(Math.random() * maxRegHours) + 1;
    const registrationEndTime = new Date(
      createdAt.getTime() + regHours * 3600 * 1000
    );
    return {
      id: `contest-${quiz.id}-id`,
      name: quiz.title,
      quizId: quiz.id,
      startTime,
      endTime,
      createdAt,
      registrationEndTime,
    };
  });
  await prisma.contest.createMany({ data: contestData });
}
