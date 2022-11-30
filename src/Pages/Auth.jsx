import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useStore from "../store.js";

const Auth = () => {
  const { setIntraId, _server } = useStore((state) => state);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const _serverUrl = `${_server}/auth/firstJoin/?code=${token}`;
      if (token) {
        try {
          const response = await axios.get(_serverUrl);
          if (response.status === 200) {
            setIntraId(response.data.intraId);
            navigate("/signup", { state: response.data });
          }
        } catch (error) {
          console.log(error);
          navigate("/", { state: { isAlreadySignedUp: true } });
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
