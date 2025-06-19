/*
  Warnings:

  - Added the required column `pinned` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "pinned" BOOLEAN NOT NULL,
ADD COLUMN     "pinnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
