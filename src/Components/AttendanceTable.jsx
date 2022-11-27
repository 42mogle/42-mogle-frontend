import React from "react";
import AttendanceTableSummary from "./AttedanceTableSummary";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AttendanceTable = ({ summary, attendanceLog }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ bgcolor: "text.disabled" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>출석 기록</TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              이번 달 개근 일수
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              이번 달 개근 여부
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AttendanceTableSummary
            summary={summary}
            attendanceLog={attendanceLog}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
