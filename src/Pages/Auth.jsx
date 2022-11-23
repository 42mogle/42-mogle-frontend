import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const _serverUrl = `http://10.19.247.186:3042/auth/firstJoin/?code=${token}`;
      console.log(token);
      if (token) {
        // TODO [try ... catch] 문으로 사용하기
        const response = await axios.get(_serverUrl);
        console.log(response);
        navigate("/home");
      }
    })();
  });

  return (
    <Typography component="h1" variant="h3">
      Loading...
    </Typography>
  );
};

export default Auth;
