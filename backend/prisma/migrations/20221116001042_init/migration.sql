/*
  Warnings:

  - Added the required column `image_src` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `images` ADD COLUMN `image_src` TEXT NOT NULL;
