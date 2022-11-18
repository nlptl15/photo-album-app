const Joi = require('joi');

const login = {
  body: Joi.object().keys({
    email: Joi.string().trim().required(),
    password: Joi.string().required(),
  }),
};

const signup = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  }),
};

module.exports = { login, signup };
