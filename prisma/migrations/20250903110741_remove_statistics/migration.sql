/*
  Warnings:

  - You are about to drop the column `statisticsId` on the `QuizAttempt` table. All the data in the column will be lost.
  - You are about to drop the `Statistics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."QuizAttempt" DROP CONSTRAINT "QuizAttempt_statisticsId_fkey";

-- AlterTable
ALTER TABLE "public"."QuizAttempt" DROP COLUMN "statisticsId";

-- DropTable
DROP TABLE "public"."Statistics";
