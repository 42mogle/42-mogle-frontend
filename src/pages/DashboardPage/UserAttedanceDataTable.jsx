import { useState } from "react";
import SearchBar from "./SearchBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "date", headerName: "날짜", width: 200 },
];

const rows = [
  { id: 1, date: "2022-11-01" },
  { id: 2, date: "2022-11-02" },
  { id: 3, date: "2022-11-03" },
  { id: 4, date: "2022-11-04" },
  { id: 5, date: "2022-11-05" },
  { id: 6, date: "2022-11-06" },
  { id: 7, date: "2022-11-07" },
  { id: 8, date: "2022-11-08" },
];

function UserAttendanceDataTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectionModel, setSelectionModel] = useState(() =>
    rows.filter((row) => row.id > 5).map((row) => row.id)
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const handleCellClick = (event) => {
    if (event.field === "__check__") console.log(event);
  };
  const handleAllCheckbox = (event) => {
    if (event.field === "__check__") console.log(event);
  };
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            DB 수정
          </Typography>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Box sx={{ mt: 1, height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              selectionModel={selectionModel}
              onCellClick={handleCellClick}
              onColumnHeaderClick={handleAllCheckbox}
              onSelectionModelChange={(event) => {
                // console.log(event);
                setSelectionModel(event);
                const selectedIDs = new Set(event);
                const selectedRows = rows.filter((r) => selectedIDs.has(r.id));
                setSelectedRows(selectedRows);
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserAttendanceDataTable;
