/*
  Warnings:

  - You are about to drop the `TaskCount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskCount" DROP CONSTRAINT "TaskCount_userId_fkey";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "deadline" TIMESTAMP(3);

-- DropTable
DROP TABLE "TaskCount";

-- CreateTable
CREATE TABLE "task_count" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pending" INTEGER NOT NULL DEFAULT 0,
    "doinng" INTEGER NOT NULL DEFAULT 0,
    "completed" INTEGER NOT NULL DEFAULT 0,
    "canceled" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_count_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task_count_userId_key" ON "task_count"("userId");

-- AddForeignKey
ALTER TABLE "task_count" ADD CONSTRAINT "task_count_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
