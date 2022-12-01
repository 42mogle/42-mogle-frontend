import apiManager from "./apiManager";

const requestPost = async (url, data) => {
  try {
    const response = await apiManager.post(url, data);
    return response;
  } catch (error) {
    return error;
  }
};

export default requestPost;
