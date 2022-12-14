/*
  Warnings:

  - A unique constraint covering the columns `[totpToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totpToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totpToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_totpToken_key" ON "User"("totpToken");
