-- CreateTable
CREATE TABLE "public"."Trophy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT NOT NULL,
    "rewardsId" TEXT,

    CONSTRAINT "Trophy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rewards" (
    "id" TEXT NOT NULL,
    "xpLevel" INTEGER NOT NULL,
    "xpPointsToNext" INTEGER NOT NULL,
    "xpCurrentPoints" INTEGER NOT NULL,
    "rank" TEXT NOT NULL,
    "nextRankUnlockLevel" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Trophy" ADD CONSTRAINT "Trophy_rewardsId_fkey" FOREIGN KEY ("rewardsId") REFERENCES "public"."Rewards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rewards" ADD CONSTRAINT "Rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
