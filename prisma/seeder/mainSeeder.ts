import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient();

async function clearDatabase() {
  // Delete child tables first to avoid foreign key constraint errors
  await prisma.quizAttempt.deleteMany({});
  await prisma.topCategory.deleteMany({}); // <-- delete child before parent
  await prisma.profileStats.deleteMany({});
  await prisma.rewards.deleteMany({});
  await prisma.trophy.deleteMany({});
  await prisma.statistics.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.user.deleteMany({});
}

async function runSeeders() {
  const { main: userSeed } = await import("./userSeed");
  await userSeed();

  const { main: quizSeed } = await import("./quizSeed");
  await quizSeed();

  const { main: rewardSeed } = await import("./rewardSeed");
  await rewardSeed();

  const { main: profileStatsSeed } = await import("./profileStatsSeed");
  await profileStatsSeed();

  const { main: quizAttemptSeed } = await import("./quizAttemptSeed");
  await quizAttemptSeed();
}

async function main() {
  await clearDatabase();
  await runSeeders();
  console.log("All seeders executed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
