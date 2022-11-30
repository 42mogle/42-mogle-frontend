import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

const AttendanceLog = ({ open, attendanceLog }) => {
  if (!attendanceLog.length) {
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
