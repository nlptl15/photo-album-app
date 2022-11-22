/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/**
 * @type { import("@prisma/client").PrismaClient } Prisma
 */
const prisma = require('../configs/db');
const { itemsPerList, DataStatus } = require('../configs/constants');
const { Prisma } = require('@prisma/client');

const save = async (data) => {
  const created = await prisma.image.create({
    data: {
      title: data.title,
      imageSrc: data.imageSrc,
      userId: data.userId,
      imageLabels: data.imageLabels,
    },
  });
  return created.id;
};

const viewById = async (id) => {
  const imageData = await prisma.image.findUnique({ where: { id } });
  return imageData;
};

const updateById = async (id, data) => {
  const updated = await prisma.image.update({
    where: { id },
    data: {
      title: data.title,
      imageSrc: data.imageSrc,
      userId: data.userId,
      imageLabels: data.imageLabels,
    },
  });

  return updated.id;
};

const deleteById = async (id) => {
  const deleted = await prisma.image.delete({
    where: { id },
  });

  return deleted.id;
};

const fetchAll = async (skip, searchString, userId) => {
  const searchStr = `${`%${searchString}%`}`;

  const data = await prisma.$queryRaw`
                      SELECT * FROM images
                      WHERE user_id = ${userId}         
                      ${
                        searchString
                          ? Prisma.sql` AND ( title LIKE ${searchStr} or image_labels LIKE ${searchStr} );`
                          : Prisma.empty
                      }`;

  return {
    totalRecords: data.length || 0,
    images:
      data?.map((d) => ({
        id: d.id,
        title: d.title,
        imageSrc: d.image_src,
        imageLabels: d.image_labels,
      })) || [],
  };
};

module.exports = {
  save,
  viewById,
  updateById,
  deleteById,
  fetchAll,
};
