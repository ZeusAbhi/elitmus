/*
  Warnings:

  - You are about to drop the column `problemStatement` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `shortDesc` on the `Puzzle` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Puzzle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Puzzle` DROP COLUMN `problemStatement`,
    DROP COLUMN `shortDesc`,
    DROP COLUMN `title`;
