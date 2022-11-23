import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const _serverUrl = `http://10.19.247.186:3042/auth/firstJoin/?code=${token}`;
      if (token) {
        try {
          const response = await axios.get(_serverUrl);
          // TODO 유저가 회원가입 되어있는지 status code 로 판단할지, response 데이터에 추가로 변수를 줄지?
          if (response.status === 200) {
            if (response.data.isSignedUp === true) {
              navigate("/");
            } else {
              navigate("/signup", { state: response.data });
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
  });

  return (
    <>
      <CircularProgress sx={{ mb: 3 }} />
      <Typography>모닝글로리와 함께 아침을 맞이하는 중입니다!</Typography>
    </>
  );
};

export default Auth;
