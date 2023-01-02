import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "intraId",
    headerName: "Intra ID",
    width: 150,
    editable: true,
  },
  {
    field: "isPerfectAttendance",
    headerName: "이번 달 개근 여부",
    width: 150,
    editable: true,
  },
  {
    field: "totalAttendance",
    headerName: "이번 달 출석 일수",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, intraId: "Snow", isPerfectAttendance: "✅", totalAttendance: 20 },
  {
    id: 2,
    intraId: "Lannister",
    isPerfectAttendance: "✅",
    totalAttendance: 20,
  },
  {
    id: 3,
    intraId: "Lannister",
    isPerfectAttendance: "✅",
    totalAttendance: 20,
  },
  { id: 4, intraId: "Stark", isPerfectAttendance: "✅", totalAttendance: 20 },
  {
    id: 5,
    intraId: "Targaryen",
    isPerfectAttendance: "✅",
    totalAttendance: 20,
  },
  {
    id: 6,
    intraId: "Melisandre",
    isPerfectAttendance: "✅",
    totalAttendance: 20,
  },
  { id: 7, intraId: "Clifford", isPerfectAttendance: "❌", totalAttendance: 4 },
  { id: 8, intraId: "Frances", isPerfectAttendance: "❌", totalAttendance: 3 },
  { id: 9, intraId: "Roxie", isPerfectAttendance: "❌", totalAttendance: 6 },
];

function MonthlyUserTable() {
  return (
    <Grid item xs={8}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            이번 달 참여자 목록
          </Typography>

          <Box sx={{ mt: 1, height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MonthlyUserTable;
