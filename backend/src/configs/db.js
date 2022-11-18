const { PrismaClient } = require('@prisma/client');

if (!global.prisma) {
  global.prisma = new PrismaClient({ errorFormat: 'minimal' });
}
const { prisma } = global;

module.exports = prisma;
