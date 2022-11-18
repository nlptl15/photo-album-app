/**
 * @type { import("@prisma/client").PrismaClient } Prisma
 */
const prisma = require('../configs/db');

const save = async (data) => {
  const user = await prisma.user.create({ data });
  return user.id || null;
};

const getUserByEmail = async (email, includePassword = false) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      password: includePassword,
    },
  });
  return user || null;
};

const getUserById = async (id, includePassword = false) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      password: includePassword,
    },
  });
  return user || null;
};

module.exports = {
  getUserByEmail,
  getUserById,
  save,
};
