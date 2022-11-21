/*
  Warnings:

  - You are about to drop the `labels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `labelsonimages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `labels` DROP FOREIGN KEY `labels_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `labelsonimages` DROP FOREIGN KEY `LabelsOnImages_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `labelsonimages` DROP FOREIGN KEY `LabelsOnImages_labelId_fkey`;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `image_labels` TEXT NULL;

-- DropTable
DROP TABLE `labels`;

-- DropTable
DROP TABLE `labelsonimages`;
