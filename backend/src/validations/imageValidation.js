const Joi = require('joi');

const createImage = {
  body: Joi.object().keys({
    title: Joi.string().trim().required(),
  }),
};

const viewById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    status: Joi.number().required(),
  }),
};

const deleteById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  createImage,
  viewById,
  updateById,
  deleteById,
};
