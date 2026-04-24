import API from "./api";

// Upload image
export const uploadImageAPI = async (formData) => {
  const res = await API.post("/images/upload", formData);
  return res.data;
};

// Get images by folder
export const getImagesAPI = async (folderId) => {
  const res = await API.get(`/images/${folderId}`);
  return res.data;
};

