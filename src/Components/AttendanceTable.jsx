import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const createData = (attendanceCount, isFullAttendance) => {
  return {
    attendanceCount,
    isFullAttendance,
    history: [
      {
        date: "2022-11-01",
        time: "08:30:20",
      },
      {
        date: "2020-11-02",
        time: "08:32:20",
      },
    ],
  };
};

const rows = [createData(2, "✅")];

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
          {row.attendanceCount}
        </TableCell>
        <TableCell align="center">{row.isFullAttendance}</TableCell>
      </TableRow>
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const AttendanceTable = () => {
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
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
