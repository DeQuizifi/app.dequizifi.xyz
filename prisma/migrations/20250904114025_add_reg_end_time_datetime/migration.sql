/*
  Warnings:

  - You are about to drop the column `registrationEndTimeHours` on the `Contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Contest" DROP COLUMN "registrationEndTimeHours",
ADD COLUMN     "registrationEndTime" TIMESTAMP(3);
