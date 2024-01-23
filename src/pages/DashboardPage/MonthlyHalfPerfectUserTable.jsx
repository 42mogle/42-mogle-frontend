import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const columns = [
  {
    field: "intraId",
    headerName: "Intra ID",
    width: 120,
    editable: true,
  },
];

const csvOptions = { utf8WithBom: true };

function CustomToolbar() {
  return (
    <GridToolbarExportContainer>
      <GridCsvExportMenuItem options={csvOptions} />
    </GridToolbarExportContainer>
  );
}

function MonthlyHalfPerfectUserTable(props) {
  const { data } = props;
  const rows = [];
  if (data.length > 0) {
    data.forEach((user) => {
      if (user.isPerfect) {
        rows.push({...user, ...user.userInfo});
      }
    });
  }
  
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            1/2 개근자 목록
          </Typography>

          <Box sx={{ mt: 1, height: 450, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.userInfo.intraId}
              components={{ Toolbar: CustomToolbar }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MonthlyHalfPerfectUserTable;
