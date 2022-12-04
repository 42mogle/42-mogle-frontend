import "./AttendanceTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AttendanceTable = (props) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ bgcolor: "text.disabled" }}>
          <TableRow>
            <TableCell className="tableHeadText">출석 기록</TableCell>
            <TableCell className="tableHeadText">이번 달 출석 일수</TableCell>
            <TableCell className="tableHeadText">이번 달 개근 여부</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{props.children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
