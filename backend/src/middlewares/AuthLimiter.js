const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: true, message: 'Too many requests created from this IP, Please try later.' },
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};
