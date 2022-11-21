require('dotenv');

const DataStatus = {
  1: 'Active',
  Active: 1,
  ACTIVE: 1,
  2: 'Completed',
  COMPLETED: 2,
};

const dev = process.env.NODE_ENV !== 'prod';

const COOKIE_OPTIONS = {
  httpOnly: true,
  domain: process.env.COOKIE_DOMAIN,
  // Since localhost is not having https protocol,
  secure: !dev,
  maxAge: 60 * 60 * 24 * 7 * 1000,
};

const AUTH_COOKIE = 'pa_auth_tkn';

module.exports = {
  DataStatus,
  COOKIE_OPTIONS,
  AUTH_COOKIE,
};
