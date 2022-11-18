import { deleteApiCall, getApiCall, postApiCall } from '../utils/Api';

export const getImages = async (skip, searchString) => {
  const result = await getApiCall(`/images`);
  return result.data;
};

export const getImageById = async (imageId) => {
  const result = await getApiCall(`/images/${imageId}`);
  return result.data;
};

export const createImage = async (imgData) => {
  const result = await postApiCall(`/images`, imgData);
  return result.data;
};

export const uploadImage = async (payload) => {
  const result = await postApiCall(`/image-upload`, payload);
  return result.data;
};

export const updateImageById = async (imageId, imgData) => {
  const result = await postApiCall(`/images/${imageId}`, imgData);
  return result.data;
};

export const deleteImageById = async (imageId) => {
  const result = await deleteApiCall(`/images/${imageId}`);
  return result.data;
};
