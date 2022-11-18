const bcrypt = require('bcryptjs');
const decode = require('jsonwebtoken/decode');
const { StatusCodes } = require('http-status-codes');
const usersModel = require('../models/usersModel');
const { formatErrorMsg } = require('../utils/CommonFuncs');
const { getToken } = require('../utils/Token');
const { AUTH_COOKIE } = require('../configs/constants');

const signUpUser = async (data) => {
  const result = {
    error: false,
    data: {},
  };

  try {
    if (data.password !== data.confirmPassword) {
      result.error = true;
      result.status = StatusCodes.BAD_REQUEST;
      result.message = 'Confirm password and password does not match';
    } else {
      const toBeCreatedUser = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        pswdSKey: '',
      };

      toBeCreatedUser.pswdSKey = await bcrypt.genSalt(10);
      toBeCreatedUser.password = await bcrypt.hash(data.password, toBeCreatedUser.pswdSKey);
      const userId = await usersModel.save(toBeCreatedUser);

      if (userId) {
        const userData = await usersModel.getUserById(userId);
        result.data.user = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        };
        // Sign user detail and store in cookie
        result.data = getToken(userData);
      } else {
        result.error = true;
        result.status = StatusCodes.BAD_REQUEST;
        result.message = 'Some unknown error occured.';
      }
    }
  } catch (error) {
    result.error = true;
    result.status = StatusCodes.INTERNAL_SERVER_ERROR;
    result.message = formatErrorMsg(error);
    if (error.code === 'P2002') {
      result.message = 'Account with this email already exist.';
    }
  }

  return result;
};

const loginUserWithEmailAndPassword = async (data) => {
  const result = {
    error: false,
    data: {},
  };
  try {
    const user = await usersModel.getUserByEmail(data.email, true);

    if (user) {
      const isPasswordMatch = await bcrypt.compare(data.password, user.password);
      if (isPasswordMatch) {
        const userDetails = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        // Sign user detail and store in cookie
        result.data = getToken(userDetails);
      } else {
        result.error = true;
        result.status = StatusCodes.BAD_REQUEST;
        result.message = 'The provided value for the password or email is invalid';
      }
    } else {
      result.error = true;
      result.status = StatusCodes.BAD_REQUEST;
      result.message = 'The provided value for the password or email is invalid.';
    }
  } catch (error) {
    result.error = true;
    result.status = StatusCodes.INTERNAL_SERVER_ERROR;
    result.message = formatErrorMsg(error);
  }
  return result;
};

const validateLoggedInUser = async (req) => {
  const result = {
    error: false,
    data: {},
  };
  try {
    if (req.cookies[AUTH_COOKIE]) {
      const decodedValues = decode(req.cookies[AUTH_COOKIE]);

      const userDetails = usersModel.getUserById(decodedValues.id);
      if (userDetails) {
        result.data = userDetails;
      } else {
        result.error = true;
        result.status = StatusCodes.BAD_REQUEST;
        result.message = 'User unauthorized.';
      }
    } else {
      result.error = true;
      result.status = StatusCodes.BAD_REQUEST;
      result.message = 'User unauthorized.';
    }
  } catch (error) {
    console.log(error);
    result.error = true;
    result.status = StatusCodes.INTERNAL_SERVER_ERROR;
    result.message = formatErrorMsg(error);
  }
  return result;
};

module.exports = {
  loginUserWithEmailAndPassword,
  validateLoggedInUser,
  signUpUser,
};
