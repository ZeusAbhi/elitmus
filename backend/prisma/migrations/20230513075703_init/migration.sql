/*
  Warnings:

  - You are about to drop the `UserProgress` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[key]` on the table `Puzzle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Puzzle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserProgress` DROP FOREIGN KEY `UserProgress_userId_fkey`;

-- AlterTable
ALTER TABLE `Puzzle` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `endAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `UserProgress`;

-- CreateIndex
CREATE UNIQUE INDEX `Puzzle_key_key` ON `Puzzle`(`key`);
