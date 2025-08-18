/*
  Warnings:

  - You are about to drop the column `points` on the `ProfileStats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ProfileStats" DROP COLUMN "points",
ADD COLUMN     "overallPoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Rewards" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
