/*
  Warnings:

  - You are about to drop the column `deafultBillingAddress` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deafultShippingAddress` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "deafultBillingAddress",
DROP COLUMN "deafultShippingAddress",
ADD COLUMN     "defaultBillingAddress" INTEGER,
ADD COLUMN     "defaulttShippingAddress" INTEGER;
