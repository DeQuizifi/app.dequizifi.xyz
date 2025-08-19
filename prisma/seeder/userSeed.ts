import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
       {
        id: "user-1-id",
        username: "Jin Sakai",
        walletAddress: "0x123",
        favQuizTopic: "Science",
        balance: 222,
      },
      {
        id: "user-2-id",
        username: "Kaizoku",
        walletAddress: "0x456",
        favQuizTopic: "Science",
        balance: 222,
      },
      {
        id: "user-3-id",
        username: "Sakamoto Taro",
        walletAddress: "0x789",
        favQuizTopic: "History",
        balance: 777,
      },
      {
        id: "user-4-id",
        username: "Avocado",
        walletAddress: "0x101112",
        favQuizTopic: "Math",
        balance: 333,
      },
      {
        id: "user-5-id",
        username: "Kage",
        walletAddress: "0x131415",
        favQuizTopic: "Math",
        balance: 999,
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
