import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient();

async function seedQuizzes() {
  await prisma.quiz.create({
    data: {
      title: "DEX vs CEX",
      category: "Exchange",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `DEX vs CEX Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Unstable Coin",
      category: "Cryptocurrency",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Unstable Coin Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Blockchain Basics",
      category: "Technology",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Blockchain Basics Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Smart Contracts",
      category: "Development",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Smart Contracts Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "NFTs Explained",
      category: "Digital Assets",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `NFTs Explained Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Crypto Security",
      category: "Security",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Crypto Security Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "DeFi Deep Dive",
      category: "Finance",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `DeFi Deep Dive Question ${i + 1}`,
        })),
      },
    },
  });

  console.log("Quizzes seeded successfully.");
}

seedQuizzes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
