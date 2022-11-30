import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceButton from "../components/AttendanceButton";
import TodayWordButton from "../components/TodayWordButton";
import useStore from "../store.js";

const getTodayDate = () => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth();
  const date = todayDate.getDate();
  const day = todayDate.getDay();
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  return `${year}년 ${month + 1}월 ${date}일 ${dayOfWeek[day]}요일`;
};

const Home = () => {
  const { _intraId, _server } = useStore((state) => state);
  console.log(_intraId);
  const todayDate = getTodayDate();
  const [summary, setSummary] = useState({});
  const [isOperator, setIsOperator] = useState(false);

  const getSummary = async () => {
    try {
      const response = await axios.get(
        `${_server}/statistic/${_intraId}/userAttendanceState`
      );
      console.log(response.data);
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${_server}/user/${_intraId}`
      );
      if (response.data.isOperator) {
        setIsOperator(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSummary();
    getUserInfo();
  }, []);

  const handleRequest = async () => {
    try {
      const response = await axios.post(
        "https://10.19.247.186:3000/auth/test2/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserData = async () => {
    try {
      const response = await axios.get(
        `${_server}/statistic/${_intraId}/userAttendanceState`
      );
      console.log("handleUserData", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Avatar
        sx={{ width: 100, height: 100, mb: 3 }}
        src="https://i.ytimg.com/vi/AwrFPJk_BGU/maxresdefault.jpg"
      ></Avatar>
      <Typography variant="body1">{_intraId} 님</Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
        {todayDate}
      </Typography>
      <AttendanceTable summary={summary} />
      <AttendanceButton />
      {isOperator && <TodayWordButton />}
      {/* <Button
        variant="contained"
        color="warning"
        onClick={handleRequest}
        sx={{ mt: 3, width: 1 / 2 }}
      >
        서버에 요청 보내기
      </Button>
      <Button
        variant="outlined"
        color="warning"
        onClick={handleUserData}
        sx={{ mt: 3, width: 1 / 2 }}
      >
        유저 로그 데이터 가져오기
      </Button> */}
    </>
  );
};

export default Home;
