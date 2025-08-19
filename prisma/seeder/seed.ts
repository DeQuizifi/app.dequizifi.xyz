/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("../../src/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: "user-1-id",
        username: "Kaizoku",
        walletAddress: "0x123",
        favQuizTopic: "Science",
        balance: 101.11,
      },
      {
        id: "user-2-id",
        username: "Sakamoto Taro",
        walletAddress: "0x456",
        favQuizTopic: "History",
        balance: 777,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
