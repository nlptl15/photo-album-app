const { StatusCodes } = require('http-status-codes');
const imagesModel = require('../models/imagesModel');
const { formatErrorMsg } = require('../utils/CommonFuncs');
const bcrypt = require('bcryptjs');

const getList = async (params, user) => {
  const result = {
    error: false,
    data: {},
  };
  try {
    const skip = Number(params.skip) || 0;
    const searchString = params.searchString || '';
    const data = await imagesModel.fetchAll(skip, searchString, user.id);
    console.log(data);
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

const deleteById = async (req) => {
  const result = {
    error: false,
    data: {},
  };
  const id = Number(req.params.id) || 0;
  console.log(req.body);
  console.log(req.params);
  console.log(req.user);
  try {
    const isPasswordMatch = await bcrypt.compare(
      req.body.confirmedPassword || '',
      req.user.password
    );
    if (isPasswordMatch) {
      const qData = await imagesModel.deleteById(id);
      if (qData) {
        result.data = qData;
      } else {
        result.error = true;
        result.status = StatusCodes.NOT_FOUND;
        result.message = 'No Image Found.';
      }
    } else {
      result.error = true;
      result.status = StatusCodes.BAD_REQUEST;
      result.message = 'The provided value for the password is invalid. You cannot delete image.';
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
