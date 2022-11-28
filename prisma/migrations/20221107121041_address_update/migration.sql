/*
  Warnings:

  - Added the required column `buildingNum` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doorNum` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('ONLINE', 'RESTAURANT', 'COMETAKE', 'OTHER');

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "buildingNum" VARCHAR(50) NOT NULL,
ADD COLUMN     "doorNum" VARCHAR(50) NOT NULL,
ALTER COLUMN "zip" SET DEFAULT '59851';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "type" "OrderType" NOT NULL;

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "isValid" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Tables" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "src" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);
