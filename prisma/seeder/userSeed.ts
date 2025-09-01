import { PrismaClient } from "../../src/generated/prisma";

export async function main(prisma: PrismaClient) {
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
      {
        id: "user-6-id",
        username: "Luna Star",
        walletAddress: "0x161718",
        favQuizTopic: "Geography",
        balance: 555,
      },
      {
        id: "user-7-id",
        username: "Max Power",
        walletAddress: "0x192021",
        favQuizTopic: "Sports",
        balance: 444,
      },
      {
        id: "user-8-id",
        username: "Nova Byte",
        walletAddress: "0x222324",
        favQuizTopic: "Technology",
        balance: 888,
      },
      {
        id: "user-9-id",
        username: "Echo Wave",
        walletAddress: "0x252627",
        favQuizTopic: "Music",
        balance: 321,
      },
      {
        id: "user-10-id",
        username: "Pixel Dash",
        walletAddress: "0x282930",
        favQuizTopic: "Art",
        balance: 654,
      },
      {
        id: "user-11-id",
        username: "Blaze Rider",
        walletAddress: "0x313233",
        favQuizTopic: "History",
        balance: 777,
      },
      {
        id: "user-12-id",
        username: "Sky Frost",
        walletAddress: "0x343536",
        favQuizTopic: "Science",
        balance: 222,
      },
      {
        id: "user-13-id",
        username: "Mira Quest",
        walletAddress: "0x373839",
        favQuizTopic: "Literature",
        balance: 555,
      },
      {
        id: "user-14-id",
        username: "Rex Thunder",
        walletAddress: "0x404142",
        favQuizTopic: "Math",
        balance: 999,
      },
      {
        id: "user-15-id",
        username: "Violet Dream",
        walletAddress: "0x434445",
        favQuizTopic: "Art",
        balance: 333,
      },
    ],
    skipDuplicates: true,
  });
}

// Note: main() is now called from mainSeeder.ts
