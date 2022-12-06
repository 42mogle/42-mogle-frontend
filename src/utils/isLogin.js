const isLogin = () => {
  return localStorage.getItem("accessToken") ? true : false;
};

export default isLogin;
