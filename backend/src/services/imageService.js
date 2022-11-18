const { StatusCodes } = require('http-status-codes');
const imagesModel = require('../models/imagesModel');
const { formatErrorMsg } = require('../utils/CommonFuncs');

const getList = async (params, user) => {
  const result = {
    error: false,
    data: {},
  };
  try {
    const skip = Number(params.skip) || 0;
    const searchString = params.searchString || '';
    const data = await imagesModel.fetchAll(skip, searchString, user.id);
    result.data = data;
  } catch (e) {
    console.log(e);
    result.error = true;
    result.status = StatusCodes.INTERNAL_SERVER_ERROR;
    result.message = formatErrorMsg(e);
  }

  return result;
};

const create = async (data, user) => {
  const result = {
    error: false,
    data: {},
  };

  try {
    const qData = await imagesModel.save({ ...data, userId: user.id });

    if (qData) {
      result.data = qData;
    } else {
      result.error = true;
      result.status = StatusCodes.INTERNAL_SERVER_ERROR;
      result.message = 'Something went wrong while creating todo.';
    }
  } catch (e) {
    result.error = true;
    result.status = StatusCodes.INTERNAL_SERVER_ERROR;
    result.message = formatErrorMsg(e);
  }

  return result;
};

const viewById = async (params) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(params.id) || 0;

  try {
    const qData = await imagesModel.viewById(id);
    if (qData) {
      result.data = qData;
    } else {
      result.error = true;
      result.status = StatusCodes.NOT_FOUND;
      result.message = 'No Todo Found.';
    }
  } catch (e) {
    result.error = true;
    result.status = StatusCodes.INTERNAL_SERVER_ERROR;
    result.message = formatErrorMsg(e);
  }
  return result;
};

const updateById = async (params, data) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(params.id) || 0;

  try {
    const qData = await imagesModel.updateById(id, data);
    if (qData) {
      // update fields
      result.data = qData;
    } else {
      result.error = true;
      result.status = StatusCodes.INTERNAL_SERVER_ERROR;
      result.message = 'Something went wrong while updating todo. Please try again.';
    }
  } catch (e) {
    result.error = true;
    result.status = StatusCodes.INTERNAL_SERVER_ERROR;
    result.message = formatErrorMsg(e);
  }
  return result;
};

const deleteById = async (params) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(params.id) || 0;

  try {
    const qData = await imagesModel.deleteById(id);
    if (qData) {
      result.data = qData;
    } else {
      result.error = true;
      result.status = StatusCodes.NOT_FOUND;
      result.message = 'No Todo Found.';
    }
  } catch (e) {
    result.error = true;
    result.status = StatusCodes.INTERNAL_SERVER_ERROR;
    result.message = formatErrorMsg(e);
  }
  return result;
};

module.exports = {
  getList,
  create,
  viewById,
  updateById,
  deleteById,
};
