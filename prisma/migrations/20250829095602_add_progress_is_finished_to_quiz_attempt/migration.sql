-- AlterTable
ALTER TABLE "public"."QuizAttempt" ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL DEFAULT 0;
