import React, { useEffect, useState } from "react";
import axios from "axios";
import AttendanceLog from "./AttendanceLog";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useStore } from "../../store.js";

function AttendaceSummary(props) {
  const { attendanceLog } = props;
  const { _intraId, _summary, setSummary } = useStore((state) => state);
  const [open, setOpen] = useState(false);

  const getSummary = async () => {
    try {
      // const userAttendanceStateApi = `/statistic/${_intraId}/userAttendanceState`;
      // const response = await requestGet(userAttendanceStateApi);
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/statistic/${_intraId}/userAttendanceState`,
        config
      );
      console.log(`getSummary: ${response}`);
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

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
        <TableCell align="center">{_summary.isPerfect ? "✅" : "❌"}</TableCell>
      </TableRow>
      <AttendanceLog open={open} attendanceLog={attendanceLog} />
    </React.Fragment>
  );
}

export default AttendaceSummary;
