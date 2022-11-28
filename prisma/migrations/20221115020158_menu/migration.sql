-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_menuId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "menuId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
