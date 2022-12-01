import React, { useEffect } from "react";
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import useStore from "../../store.js"

const AttendanceLog = ({ open, attendanceLog }) => {
  const { _intraId, _isAttended, _attendanceLog, setAttendanceLog } = useStore(
    (state) => state
  );
  useEffect(() => {
    const getAttendanceLog = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        const response = await axios.get(
          `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/statistic/${_intraId}/userAttendanceList`,
          config
        );

        const attendanceList = response.data.map(({ timelog }) => {
          const attendanceDate = new Date(timelog);
          const _date = format(attendanceDate, "PPP EEEE", { locale: ko });
          const _time = format(attendanceDate, "HH:mm:ss");
          return { date: _date, time: _time };
        });

        console.log(attendanceList);

        setAttendanceLog(attendanceList);
      } catch (error) {
        console.log(error);
      }
    };
    getAttendanceLog();
  }, [_isAttended]);

  if (_attendanceLog !== undefined && _attendanceLog.length === 0) {
    return;
  } else {
    return (
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="attendanceLog">
                <TableHead sx={{ bgcolor: "#EBEBF0" }}>
                  <TableRow>
                    <TableCell>일시</TableCell>
                    <TableCell>시간</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_attendanceLog.map((log) => (
                    <TableRow key={log.date}>
                      <TableCell component="th" scope="row">
                        {log.date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {log.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    );
  }
};

export default AttendanceLog;