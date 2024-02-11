import React, { useEffect, useState } from "react";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import apiManager from "@api/apiManager.js";
import useStore from "@utils/store.js";

const AttendanceLog = ({ open }) => {
  const { _attendanceCount } = useStore((state) => state);
  const [attendanceLog, setAttendanceLog] = useState([]);
  useEffect(() => {
    const getAttendanceLog = async () => {
      try {
        const response = await apiManager.get(`/statistic/userAttendanceList`);

        const attendanceList = response.data
          .map(({ timelog }) => {
            return new Date(timelog);
          })
          .sort((a, b) => a - b)
          .map((attendanceDate) => {
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
  }, [_attendanceCount]);

  if (attendanceLog !== undefined && attendanceLog.length === 0) {
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
                  {attendanceLog.map((log) => (
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
