import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceTableSummary from "./AttedanceTableSummary";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useStore from "../store.js";

const timeChanger = (number) => {
  if (number < 10) return `0${number}`;
  else return `${number}`;
};

const AttendanceTable = ({ summary }) => {
  const { _intraId, _attendanceLog, _isAttended, setAttendanceLog } = useStore(
    (state) => state
  );

  useEffect(() => {
    const getAttendanceLog = async () => {
      const attendanceList = [];
      try {
        const response = await axios.get(
          `http://10.19.202.231:3000/statistic/${_intraId}/userAttendanceList`
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
          <AttendanceTableSummary
            summary={summary}
            attendanceLog={_attendanceLog}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
