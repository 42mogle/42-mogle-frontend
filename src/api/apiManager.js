import axios from "axios";

const localStorageToken = localStorage.getItem("accessToken");

const jwtToken =
  localStorageToken === null ? "" : `Bearer ${localStorageToken}`;

const apiManager = axios.create({
  baseURL: `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}`,
  headers: {
    authorization: jwtToken,
  },
});

export default apiManager;
