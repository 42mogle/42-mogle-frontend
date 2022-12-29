import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const columns = [
  {
    field: "intraId",
    headerName: "Intra ID",
    width: 120,
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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function MonthlyPerfectUserTable(props) {
  const { data } = props;
  const rows = [];
  if (data.length > 0){
    data.forEach((user) => {
      if (user.isPerfectAttendance)
        rows.push(user);
    })
  }
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            개근자 목록
          </Typography>

          <Box sx={{ mt: 1, height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.intraId}
              components={{ Toolbar: CustomToolbar }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MonthlyPerfectUserTable;
