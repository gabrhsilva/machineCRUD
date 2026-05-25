/*
  Warnings:

  - You are about to drop the column `authorId` on the `Machine` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Machine" DROP CONSTRAINT "Machine_authorId_fkey";

-- AlterTable
ALTER TABLE "Machine" DROP COLUMN "authorId";
