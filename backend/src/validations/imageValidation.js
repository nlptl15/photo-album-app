const Joi = require('joi');

const createImage = {
  body: Joi.object().keys({
    title: Joi.string().trim().required(),
    imageLabels: Joi.string(),
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
    imageId: Joi.number().required(),
    title: Joi.string().trim().required(),
    imageLabels: Joi.string(),
  }),
};

const deleteById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    confirmedPassword: Joi.string().required(),
  }),
};

module.exports = {
  createImage,
  viewById,
  updateById,
  deleteById,
};
