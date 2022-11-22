-- CreateIndex
CREATE FULLTEXT INDEX `images_image_labels_idx` ON `images`(`image_labels`);

-- CreateIndex
CREATE FULLTEXT INDEX `images_title_image_labels_idx` ON `images`(`title`, `image_labels`);
