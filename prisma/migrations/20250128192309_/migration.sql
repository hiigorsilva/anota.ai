/*
  Warnings:

  - Changed the type of `status` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TASK_STATUS" AS ENUM ('Pendente', 'Fazendo', 'Concluído', 'Cancelado');

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "status",
ADD COLUMN     "status" "TASK_STATUS" NOT NULL;
