import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AttendanceTable from "../Components/AttendanceTable";
import AttendanceButton from "../Components/AttendanceButton";

const getTodayDate = () => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth();
  const date = todayDate.getDate();
  const day = todayDate.getDay();
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  return `${year}년 ${month + 1}월 ${date}일 ${dayOfWeek[day]}요일`;
};

const timeChanger = (number) => {
  if (number < 10) return `0${number}`;
  else return `${number}`;
};

const Home = () => {
  const todayDate = getTodayDate();
  const [summary, setSummary] = useState({});
  const [attendanceLog, setAttendanceLog] = useState({});
  const [isOperator, setIsOperator] = useState(false);

  const getSummary = async () => {
    try {
      const response = await axios.get(
        "http://10.19.202.231:3000/statistic/susong/userAttendanceState"
      );
      console.log(response.data);
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAttendanceLog = async () => {
    const attendanceList = [];
    try {
      const response = await axios.get(
        "http://10.19.202.231:3000/statistic/susong/userAttendanceList"
      );
      response.data.forEach((obj) => {
        const originDate = new Date(obj.timelog);
        const _date = `${originDate.getFullYear()}-${timeChanger(
          originDate.getMonth() + 1
        )}-${timeChanger(originDate.getDate())}`;
        const _time = `${timeChanger(originDate.getHours())}:${timeChanger(
          originDate.getMinutes()
        )}:${timeChanger(originDate.getSeconds())}`;
        attendanceList.push({
          date: _date,
          time: _time,
        });
      });
      setAttendanceLog(attendanceList);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://10.19.202.231:3000/user/mgo");
      console.log(response.data);
      if (response.data.isOperator) {
        setIsOperator(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSummary();
    getAttendanceLog();
    getUserInfo();
  }, []);

  const handleRequest = async () => {
    try {
      const response = await axios.post(
        "http://10.19.247.186:3000/auth/test2/",
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
        "http://10.19.202.231:3000/statistic/joonhan/userAttendanceState"
      );
      console.log(response);
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
      <Typography variant="body1">모닝글로리 님</Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
        {todayDate}
      </Typography>
      <AttendanceTable summary={summary} attendanceLog={attendanceLog} />
      {/* TODO 출석 상태에 따라 메세지도 다르게 설정 */}
      {/* TODO 출석 상태에 버튼 활성화 여부도 다르게 설정 */}
      <AttendanceButton />
      {isOperator && (
        <Button variant="outlined" sx={{ mt: 3, width: 1 / 2 }}>
          오늘의 단어 설정
        </Button>
      )}

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
