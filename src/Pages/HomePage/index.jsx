import React, { useState, useEffect, Profiler } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import AttendanceTable from "./AttendanceTable";
import AttendanceButton from "./AttendanceButton";
import SetTodayWordButton from "./SetSetTodayWordButton";
import TestButtons from "./TestButtons";
import useStore from "../../store.js";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import UserProfile from "./UserProfile";

// 오늘 날짜를 "yyyy년 MM월 dd일 e요일" 형식으로 변환
const getTodayDate = () => {
  const todayDate = new Date();
  return `${format(todayDate, "PPP EEEE", { locale: ko })}`;
};

const Home = () => {
  const { _intraId, _photoUrl } = useStore((state) => state);
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

  return (
    <>
      <UserProfile intraId={_intraId} photoUrl={_photoUrl} />
      <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
        {getTodayDate()}
      </Typography>
      <AttendanceTable summary={summary} />
      <AttendanceButton />
      {isOperator && <SetTodayWordButton />}
      <TestButtons />
    </>
  );
};

export default Home;
