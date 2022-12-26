import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "intraId",
    headerName: "Intra ID",
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, intraId: "Snow" },
  {
    id: 2,
    intraId: "Lannister",
  },
  {
    id: 3,
    intraId: "Lannister",
  },
  { id: 4, intraId: "Stark" },
  {
    id: 5,
    intraId: "Targaryen",
  },
  {
    id: 6,
    intraId: "Melisandre",
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function MonthlyPerfectUserTable() {
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            이번 달 개근자 목록
          </Typography>

          <Box sx={{ mt: 1, height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              components={{ Toolbar: CustomToolbar }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MonthlyPerfectUserTable;