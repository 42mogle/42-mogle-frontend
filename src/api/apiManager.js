import axios from "axios";

const apiManager = axios.create({
  baseURL: `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}`,
  headers: {
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default apiManager;
