import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient();

export async function main() {
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

  await prisma.quiz.create({
    data: {
      title: "Web3 Wallets",
      category: "Wallets",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Web3 Wallets Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Tokenomics 101",
      category: "Economics",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Tokenomics 101 Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Layer 2 Solutions",
      category: "Scaling",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Layer 2 Solutions Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Regulation & Compliance",
      category: "Legal",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Regulation & Compliance Question ${i + 1}`,
        })),
      },
    },
  });

  await prisma.quiz.create({
    data: {
      title: "Crypto Mining",
      category: "Mining",
      questions: {
        create: Array.from({ length: 20 }, (_, i) => ({
          text: `Crypto Mining Question ${i + 1}`,
        })),
      },
    },
  });

  console.log("Quizzes seeded successfully.");
}

// Note: main() is now called from mainSeeder.ts
