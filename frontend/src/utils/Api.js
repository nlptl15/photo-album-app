import axios from "axios";

export const postApiCall = async (endpoint, data) => {
  const options = {
    url: `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    data: data || {},
  };

  try {
    const response = await axios(options);
    return response;
  } catch (e) {
    throw e;
  }
};

export const getApiCall = async (endpoint) => {
  const options = {
    url: `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    data: {},
  };

  try {
    const response = await axios(options);
    return response;
  } catch (e) {
    throw e;
  }
};

export const deleteApiCall = async (endpoint) => {
  const options = {
    url: `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    data: {},
  };

  try {
    const response = await axios(options);
    return response;
  } catch (e) {
    throw e;
  }
};
