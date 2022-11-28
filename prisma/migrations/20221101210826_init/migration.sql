/*
  Warnings:

  - You are about to drop the column `usedByProductAsExtraId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `usedByProductId` on the `Ingredient` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_usedByProductAsExtraId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_usedByProductId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "usedByProductAsExtraId",
DROP COLUMN "usedByProductId";

-- CreateTable
CREATE TABLE "_ingredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_extraIngredients" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ingredients_AB_unique" ON "_ingredients"("A", "B");

-- CreateIndex
CREATE INDEX "_ingredients_B_index" ON "_ingredients"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_extraIngredients_AB_unique" ON "_extraIngredients"("A", "B");

-- CreateIndex
CREATE INDEX "_extraIngredients_B_index" ON "_extraIngredients"("B");

-- AddForeignKey
ALTER TABLE "_ingredients" ADD CONSTRAINT "_ingredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ingredients" ADD CONSTRAINT "_ingredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_extraIngredients" ADD CONSTRAINT "_extraIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_extraIngredients" ADD CONSTRAINT "_extraIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
