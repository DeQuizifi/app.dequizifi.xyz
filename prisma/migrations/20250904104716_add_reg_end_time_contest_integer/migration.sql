/*
  Warnings:

  - You are about to drop the column `registrationEndTime` on the `Contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Contest" DROP COLUMN "registrationEndTime",
ADD COLUMN     "registrationEndTimeHours" INTEGER;
