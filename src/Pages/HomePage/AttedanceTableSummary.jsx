import React, { useState } from "react";
import AttendanceLog from "./AttendanceLog";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const AttendaceTableSummary = ({
  summary: { attendanceCount, isPerfect },
  attendanceLog,
}) => {
  const [open, setOpen] = useState(false);
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
          {attendanceCount}
        </TableCell>
        <TableCell align="center">{isPerfect ? "✅" : "❌"}</TableCell>
      </TableRow>
      <AttendanceLog open={open} attendanceLog={attendanceLog} />
    </React.Fragment>
  );
};

export default AttendaceTableSummary;
