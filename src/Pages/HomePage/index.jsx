import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AttendanceTable from "./AttendanceTable";
import AttendanceButton from "./AttendanceButton";
import TodayWordButton from "./TodayWordButton";
import useStore from "../../store.js";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// 오늘 날짜를 "yyyy년 MM월 dd일 e요일" 형식으로 변환
const getTodayDate = () => {
  const todayDate = new Date();
  return `${format(todayDate, "PPP EEEE", { locale: ko })}`;
};

const Home = () => {
  const { _intraId } = useStore((state) => state);
  console.log(_intraId);
  const [summary, setSummary] = useState({});
  const [isOperator, setIsOperator] = useState(false);

  const getSummary = async () => {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/statistic/${_intraId}/userAttendanceState`
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
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/user/${_intraId}`
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
      console.log(process.env.REACT_APP_AWS_BACKEND_SERVER);
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/serverAuth/test0/`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserData = async () => {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/statistic/${_intraId}/userAttendanceState`
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
      />
      <Typography variant="body1">{_intraId} 님</Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
        {getTodayDate()}
      </Typography>
      <AttendanceTable summary={summary} />
      <AttendanceButton />
      {isOperator && <TodayWordButton />}
      <Button
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
      </Button>
    </>
  );
};

export default Home;
