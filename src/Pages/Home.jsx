import React, { useState } from "react";
import { Avatar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AttendanceTable from "../Components/AttendanceTable";

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
  const todayDate = getTodayDate();
  return (
    <>
      <Avatar
        sx={{ width: 100, height: 100, mb: 3 }}
        src="https://i.ytimg.com/vi/AwrFPJk_BGU/maxresdefault.jpg"
      ></Avatar>
      <Typography variant="body1">모닝글로리 님</Typography>
      <Typography variant="subtitle1" color="primary.main" sx={{ mt: 1 }}>
        {todayDate}
      </Typography>
      <AttendanceTable />
      {/* TODO 출석 상태에 따라 메세지도 다르게 설정 */}
      {/* TODO 출석 상태에 버튼 활성화 여부도 다르게 설정 */}
      <Button variant="contained" color="success" sx={{ mt: 3, width: 1 / 2 }}>
        출석체크
      </Button>
      {/* TODO 오퍼레이터일때만 버튼 보이도록 설정 */}
      <Button variant="outlined" sx={{ mt: 3, width: 1 / 2 }}>
        오늘의 단어 설정
      </Button>
    </>
  );
};

export default Home;
