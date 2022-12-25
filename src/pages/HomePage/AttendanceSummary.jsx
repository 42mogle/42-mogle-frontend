import React, { useEffect, useState } from "react";
import apiManager from "../../api/apiManager";
import AttendanceLog from "./AttendanceLog";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useStore from "../../store.js";

function AttendanceSummary() {
  const { _summary, setSummary, _attendanceCount, setAttendanceCount } =
    useStore((state) => state);
  const [open, setOpen] = useState(false);

  const getSummary = async () => {
    try {
      const response = await apiManager.get("/statistic/userAttendanceState/");
      setSummary(response.data);
      setAttendanceCount(response.data.attendanceCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSummary();
  }, [_attendanceCount]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {_summary.attendanceCount}
        </TableCell>
        <TableCell align="center">{_summary.isPerfectAttendance ? "✅" : "❌"}</TableCell>
      </TableRow>
      <AttendanceLog open={open} />
    </React.Fragment>
  );
}

export default AttendanceSummary;
