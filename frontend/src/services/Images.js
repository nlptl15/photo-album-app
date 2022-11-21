import {
  deleteApiCall,
  getApiCall,
  postApiCall,
  postImageApiCall,
} from '../utils/Api';

export const getImages = async (skip, searchString) => {
  const result = await getApiCall(`/images-data`);
  return result.data;
};

export const getImageById = async (imageId) => {
  const result = await getApiCall(`/images-data/${imageId}`);
  return result.data;
};

export const createImage = async (imgData) => {
  const result = await postApiCall(`/images-data`, imgData);
  return result.data;
};

export const uploadImage = async (payload) => {
  const result = await postImageApiCall(`/image-upload`, payload);
  return result.data;
};

export const updateImageById = async (imageId, imgData) => {
  const result = await postApiCall(`/images-data/${imageId}`, imgData);
  return result.data;
};

export const deleteImageById = async (imageId, confirmedPassword) => {
  const result = await postApiCall(`/images-data/${imageId}/remove`, {
    confirmedPassword,
  });
  return result.data;
};
