import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceTable from "./AttendanceTable";
import AttendanceButton from "./AttendanceButton";
import SetTodayWordButton from "./SetTodayWordButton";
import UserProfile from "./UserProfile";
import TodayDate from "./TodayDate";
import AttendanceSummary from "./AttendanceSummary";
import TestButtons from "./TestButtons";
import useStore from "../../store.js";
import apiManager from "../../api/apiManager";
import requestGet from "../../api/requestGet";

function Home() {
  const { _intraId, _photoUrl } = useStore((state) => state);
  console.log(_intraId);
  const [summary, setSummary] = useState({});
  const [isOperator, setIsOperator] = useState(false);

  const getSummary = async () => {
    try {
      // const userAttendanceStateApi = `/statistic/${_intraId}/userAttendanceState`;
      // const response = await requestGet(userAttendanceStateApi);
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      console.log(config);
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/statistic/${_intraId}/userAttendanceState`
      , config);
      console.log(`getSummary: ${response}`);
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/user/${_intraId}`
      , config);
      console.log(`getUserInfo: ${response}`);
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
      <TodayDate />
      <AttendanceSummary summary={summary}/>
      <AttendanceTable />
      <AttendanceButton />
      {isOperator && <SetTodayWordButton />}
      <TestButtons />
    </>
  );
}

export default Home;
