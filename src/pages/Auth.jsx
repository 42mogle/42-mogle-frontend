import React from "react";
import apiManager from "../api/apiManager.js";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useStore from "../store.js";
import axios from "axios";
const HTTP_STATUS = require("http-status");

const Auth = () => {
  const { setIntraId } = useStore((state) => state);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const response = await apiManager.get(
            `/serverAuth/firstJoin/?code=${token}`
          );
          if (response.status === HTTP_STATUS.OK) {
            setIntraId(response.data.intraId);
            navigate("/signup", { state: response.data });
          }
        } catch (error) {
          console.log(error.response);
          // TODO 에러가 발생할 수 있는 상태값 확인해서 에러 메시지 다르게 띄우기
          navigate("/", { state: error.response });
        }
      }
    })();
  }, []);

  return (
    <>
      <CircularProgress sx={{ mb: 3 }} />
      <Typography>모닝글로리와 함께 아침을 맞이하는 중입니다!</Typography>
    </>
  );
};

export default Auth;
