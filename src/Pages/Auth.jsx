import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("code");
  if (token !== null) {
    const _serverUrl = `http://10.19.247.186:3042/auth/firstJoin/?code=${token}`;
    axios
      .get(_serverUrl, {
        withCredentials: true,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
  return <h1>Auth page</h1>;
};

export default Auth;
