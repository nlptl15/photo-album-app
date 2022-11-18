const { StatusCodes } = require('http-status-codes');
const imageService = require('../services/imageService');
const ApiError = require('../utils/ApiError');

const createImage = async (req, res, next) => {
  try {
    const result = await imageService.create(req.body, req.user);

    if (result.error) {
      next(ApiError(result.status, result.message));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
};

const viewById = async (req, res, next) => {
  try {
    const result = await imageService.viewById(req.params);

    if (result.error) {
      next(ApiError(result.status, result.message));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
};

const updateById = async (req, res, next) => {
  try {
    const result = await imageService.updateById(req.params, req.body);

    if (result.error) {
      next(ApiError(result.status, result.message));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
};

const deleteById = async (req, res, next) => {
  try {
    const result = await imageService.deleteById(req.params);

    if (result.error) {
      next(ApiError(result.status, result.message));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
};

const getList = async (req, res, next) => {
  try {
    console.log('getList');
    const result = await imageService.getList(req.query, req.user);

    if (result.error) {
      next(ApiError(result.status, result.message));
    } else {
      res.json({ success: true, data: result.data });
    }
  } catch (e) {
    next(ApiError(StatusCodes.INTERNAL_SERVER_ERROR, e.message));
  }
};

module.exports = {
  createImage,
  viewById,
  deleteById,
  getList,
  updateById,
};
