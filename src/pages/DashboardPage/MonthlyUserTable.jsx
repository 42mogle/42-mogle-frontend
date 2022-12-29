import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const columns = [
  {
    field: "intraId",
    headerName: "Intra ID",
    width: 150,
    editable: true,
  },
  {
    field: "isPerfectAttendance",
    headerName: "개근 여부",
    width: 80,
    editable: true,
  },
  {
    field: "attendanceCount",
    headerName: "출석 일수",
    type: "number",
    width: 80,
    editable: true,
  },
  {
    field: "totalPerfectCount",
    headerName: "누적 개근 횟수",
    type: "number",
    width: 100,
    editable: true,
  },
];

function MonthlyUserTable(props) {
  const { data } = props;
  const rows = [];
  if (data.length > 0) {
    data.forEach((user) => {
      if (user.isPerfectAttendance)
        user.isPerfectAttendance = "✅"
      else
        user.isPerfectAttendance = "❌"
      rows.push(user);
    }
    )
  }

  return (
    <Grid item xs={8}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            참여자 목록
          </Typography>

          <Box sx={{ mt: 1, height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              getRowId={(row) => row.intraId}
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
