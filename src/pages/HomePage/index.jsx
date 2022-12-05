import React, { useState, useEffect } from "react";
import apiManager from "../../api/apiManager";
import AttendanceTable from "./AttendanceTable";
import AttendanceButton from "./AttendanceButton";
import SetTodayWordButton from "./SetTodayWordButton";
import UserProfile from "./UserProfile";
import TodayDate from "./TodayDate";
import AttendanceSummary from "./AttendanceSummary";
import useStore from "../../store.js";
import TestButtons from "./TestButtons";

function Home() {
  const { _intraId, _photoUrl, setPhotoUrl } = useStore((state) => state);
  console.log(_intraId);
  const [isOperator, setIsOperator] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await apiManager.get(`/user/${_intraId}`);
      setPhotoUrl(response.data.photoUrl);
      console.log(response);
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
      <UserProfile intraId={_intraId} photoUrl={_photoUrl} />
      <TodayDate />
      {/* <AttendanceSummary /> */}
      <AttendanceTable>
        <AttendanceSummary />
      </AttendanceTable>
      <AttendanceButton />
      {isOperator && <SetTodayWordButton />}
      {/* <TestButtons /> */}
    </>
  );
}

export default Home;
