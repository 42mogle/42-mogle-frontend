import apiManager from "./apiManager";

const requestGet = async (url) => {
  try {
    const response = await apiManager.get(url);
    return response;
  } catch (error) {
    return error;
  }
};

export default requestGet;
