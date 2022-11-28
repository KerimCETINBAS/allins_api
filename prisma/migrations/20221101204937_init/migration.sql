/*
  Warnings:

  - You are about to drop the `_IngredientToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ingredients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usedByProductAsExtraId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usedByProductId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToProduct" DROP CONSTRAINT "_IngredientToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToProduct" DROP CONSTRAINT "_IngredientToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_ingredients" DROP CONSTRAINT "_ingredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_ingredients" DROP CONSTRAINT "_ingredients_B_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "usedByProductAsExtraId" INTEGER NOT NULL,
ADD COLUMN     "usedByProductId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_IngredientToProduct";

-- DropTable
DROP TABLE "_ingredients";

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_usedByProductId_fkey" FOREIGN KEY ("usedByProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_usedByProductAsExtraId_fkey" FOREIGN KEY ("usedByProductAsExtraId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
