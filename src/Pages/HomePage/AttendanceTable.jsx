import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceSummary from "./AttendanceSummary";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useStore from "../../store.js";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const AttendanceTable = ({ summary }) => {
  const { _attendanceLog, _isAttended, setAttendanceLog } = useStore(
    (state) => state
  );

  useEffect(() => {
    const getAttendanceLog = async () => {
      try {
        // const response = await axios.get(
        //   `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/statistic/${_intraId}/userAttendanceList`
        // );

        // Dummy data for test
        const response = {
          data: [
            {
              timelog: "2022-11-01 13:01:04",
            },
            {
              timelog: "2022-11-02 13:01:04",
            },
            {
              timelog: "2022-11-03 13:01:04",
            },
          ],
        };

        const attendanceList = response.data.map(({ timelog }) => {
          const attendanceDate = new Date(timelog);
          const _date = format(attendanceDate, "PPP EEEE", { locale: ko });
          const _time = format(attendanceDate, "HH:mm:ss");
          return { date: _date, time: _time };
        });

        setAttendanceLog(attendanceList);
      } catch (error) {
        console.log(error);
      }
    };
    getAttendanceLog();
  }, [_isAttended]);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ bgcolor: "text.disabled" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>출석 기록</TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              이번 달 출석 일수
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              이번 달 개근 여부
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AttendanceSummary summary={summary} attendanceLog={_attendanceLog} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
