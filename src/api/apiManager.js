import axios from "axios";

const apiManager = () => {
  return axios.create({
    baseURL: `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}`,
    headers: {
			authorization: `Bearer ${localStorage.get("accessToken")}`
    },
  });
};

export default apiManager;
