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
    field: "isPerfect",
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
      if (user.isPerfect) {
        rows.push({ ...user, ...user.userInfo, isPerfect: "✅" });
      } else {
        rows.push({ ...user, ...user.userInfo, isPerfect: "❌" });
      }
    });
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
              getRowId={(row) => row.userInfo.intraId}
              columns={columns}
              initialState={{
                sorting: {
                  sortModel: [{ field: "isPerfect", sort: "asc" }],
                },
              }}
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MonthlyUserTable;
