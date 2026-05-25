/*
  Warnings:

  - You are about to drop the column `section` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Machine` table. All the data in the column will be lost.
  - Added the required column `name` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Machine" DROP COLUMN "section",
DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "sector" VARCHAR(255) NOT NULL;
