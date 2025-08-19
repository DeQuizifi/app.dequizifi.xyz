-- CreateTable
CREATE TABLE "public"."ProfileStats" (
    "id" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "bestRank" TEXT NOT NULL,
    "weekStatus" TEXT NOT NULL,
    "quizzesWonThisWeek" INTEGER NOT NULL,
    "totalQuizzesThisWeek" INTEGER NOT NULL,

    CONSTRAINT "ProfileStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TopCategory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quizzesWon" INTEGER NOT NULL,
    "totalQuizzes" INTEGER NOT NULL,
    "profileStatsId" TEXT NOT NULL,

    CONSTRAINT "TopCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TopCategory" ADD CONSTRAINT "TopCategory_profileStatsId_fkey" FOREIGN KEY ("profileStatsId") REFERENCES "public"."ProfileStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
