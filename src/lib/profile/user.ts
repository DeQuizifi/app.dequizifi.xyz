import prisma from "@/lib/prisma/prisma";
export async function getUser() {
  const userInfo = await prisma.user.findUnique({
    where: {
      username: "Jin Sakai",
    },
  });

  if (!userInfo) {
    throw new Error(`User not found`);
  }
  return userInfo;
}

export async function getUserStats(userId: string) {
  const userStats = await prisma.quizAttempt.findMany({
    where: { userId },
    include: {
      quiz: true,
    },
  });
  return userStats;
}

export async function getRewards(userId: string) {
  const userRewards = await prisma.rewards.findFirst({
    where: { userId },
    include: {
      trophies: true,
    },
  });
  return userRewards;
}

export async function  userWelcomeHeader(userId: string){
    const welcomeHeader = await prisma.user.findUnique({
        where :{id: userId},
        select:{
            username:true,
            walletAddress:true,
            balance: true,

        }
    });
    return welcomeHeader;
}

export async function profilePersonalStats(userId : string){
    const personalStats = await prisma.profileStats.findFirst({
        where: {userId},
        select: {
            bestRank:true,
            weekStatus: true,
            overallPoints: true,
        }
    });
    return personalStats;
}