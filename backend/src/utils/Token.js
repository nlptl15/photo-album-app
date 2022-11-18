const { Strategy: JwtStrategy } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { AUTH_COOKIE } = require('../configs/constants');

/**
 * @type { import("@prisma/client").PrismaClient } Prisma
 */
const prisma = require('../configs/db');

// Initialize environment config
dotenv.config();

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: (req) => {
    let token = '';
    if (req && req.cookies) {
      token = req.cookies[AUTH_COOKIE];
    }
    return token;
  },
};

// eslint-disable-next-line arrow-body-style
const getToken = (enCodedContent) => {
  return jwt.sign(enCodedContent, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = { getToken, jwtStrategy };
