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

function Home() {
  const { _intraId, _photoUrl, setPhotoUrl } = useStore((state) => state);
  // TODO: Home 컴포넌트가 여러 번 렌더링 되는 문제가 있음
  const [isOperator, setIsOperator] = useState(false);

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

  return (
    <>
      <LoginChecker />
      <UserProfile
        intraId={_intraId}
        photoUrl={_photoUrl}
        isOperator={isOperator}
      />
      <TodayDate />
      <AttendanceTable>
        <AttendanceSummary />
      </AttendanceTable>
      <AttendanceButton />
      {isOperator && <SetTodayWordButton />}
    </>
  );
}

export default Home;
