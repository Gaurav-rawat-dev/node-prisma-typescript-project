/*
  Warnings:

  - You are about to drop the column `defaulttShippingAddress` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "defaulttShippingAddress",
ADD COLUMN     "defaultShippingAddress" INTEGER;
