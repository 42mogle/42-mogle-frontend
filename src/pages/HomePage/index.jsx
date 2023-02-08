import React, { useState, useEffect } from "react";
import apiManager from "../../api/apiManager";
import LoginChecker from "../../components/LoginChecker";
import AttendanceTable from "./AttendanceTable";
import AttendanceButton from "./AttendanceButton";
import SetTodayWordButton from "./SetTodayWordButton";
import UserProfile from "./UserProfile";
import TodayDate from "./TodayDate";
import AttendanceSummary from "./AttendanceSummary";
import useStore from "../../store.js";
import TodayWord from "./TodayWord";
const HTTP_STATUS = require("http-status");

function Home() {
  const { _intraId, _photoUrl, setPhotoUrl } = useStore((state) => state);
  // TODO: Home 컴포넌트가 여러 번 렌더링 되는 문제가 있음
  const [isOperator, setIsOperator] = useState(false);
  const [todayWord, setTodayWord] = useState({
    word: "",
    textColor: "",
    isTodayWordSet: false,
  });

  const getTodayWord = async () => {
    try {
      const response = await apiManager.get("/operator/today-word");
      if (response.status === HTTP_STATUS.OK) {
        if (response.data.length === 0) {
          setTodayWord({
            word: "",
            textColor: "warning.main",
            isTodayWordSet: false,
          });
        } else {
          setTodayWord({
            word: response.data,
            textColor: "success.main",
            isTodayWordSet: true,
          });
        }
      }
    } catch (error) {
      console.error(error);
      setTodayWord({
        word: "오류가 발생했습니다.",
        textColor: "error.main",
        isTodayWordSet: false,
      });
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await apiManager.get("/user/getUserInfo/");
      setPhotoUrl(response.data.photoUrl);
      if (response.data.isOperator) {
        setIsOperator(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getTodayWord();
  }, []);

  return (
    <>
      <LoginChecker />
      <UserProfile
        intraId={_intraId}
        photoUrl={_photoUrl}
        isOperator={isOperator}
      />
      <TodayDate />
      {isOperator && <TodayWord todayWord={todayWord} />}
      <AttendanceTable>
        <AttendanceSummary />
      </AttendanceTable>
      <AttendanceButton />
      {isOperator && (
        <SetTodayWordButton todayWord={todayWord} setTodayWord={setTodayWord} />
      )}
    </>
  );
}

export default Home;
