/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/**
 * @type { import("@prisma/client").PrismaClient } Prisma
 */
const prisma = require('../configs/db');
const { itemsPerList, DataStatus } = require('../configs/constants');

const save = async (data) => {
  const created = await prisma.image.create({
    data: {
      title: data.title,
      imageSrc: data.imageSrc,
      userId: data.userId,
    },
  });
  return created.id;
};

const viewById = async (id) => {
  const todo = await prisma.image.findUnique({ where: { id } });
  return todo;
};

const updateById = async (id, data) => {
  const updated = await prisma.image.update({
    where: { id },
    data,
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
  const data = await prisma.$transaction([
    prisma.image.count(),
    prisma.image.findMany({
      skip,
      take: itemsPerList,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId,
        ...(searchString && {
          title: { search: searchString },
        }),
      },
    }),
  ]);

  return { totalRecords: data[0] || 0, images: data[1] || [] };
};

module.exports = {
  save,
  viewById,
  updateById,
  deleteById,
  fetchAll,
};
