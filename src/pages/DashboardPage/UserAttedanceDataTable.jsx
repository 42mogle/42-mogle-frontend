import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { format } from "date-fns";

const columns = [
  { field: "date", headerName: "날짜", width: 200 },
];

const getMonthDays = (year, month) => {
  return (new Date(year, month, 0).getDate());
}

function UserAttendanceDataTable(props) {
  const {
    data: { queryYear, queryMonth },
  } = props;
  // const [rows, setRows] = useState([]);
  const rows = [];
  const monthDays = getMonthDays(queryYear, queryMonth)
  for (let day = 1; day <= monthDays; day += 1) {
    const row = format(new Date(queryYear, queryMonth - 1, day), "yyyy-MM-dd");
    console.log(row);
    rows.push({"id": day, "date": row});
  }
  const [searchIntraId, setSearchIntraId] = useState("");
  // const [selectionModel, setSelectionModel] = useState(() =>
  //   rows.filter((row) => row > 5).map((row) => row.id)
  // );
  const [selectedRows, setSelectedRows] = useState([]);
  const handleCellClick = (event) => {
    if (event.field === "__check__") console.log(event);
  };
  const handleAllCheckbox = (event) => {
    if (event.field === "__check__") console.log(event);
  };
  const loadUserAttendanceData = async () => {
    if (searchIntraId.length === 0) return;
    try {
      const query = `http://localhost:8000/attendance-list/${queryYear}/${queryMonth}/${searchIntraId}`;
      const response = await axios.get(query);
      // setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserAttendanceData();
  }, [queryYear, queryMonth, searchIntraId]);

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            DB 수정
          </Typography>
          <SearchBar
            searchQuery={searchIntraId}
            setSearchQuery={setSearchIntraId}
          />
          <Box sx={{ mt: 1, height: 400, width: "100%" }}>
            {searchIntraId.length === 0 ? (
              <Typography>검색할 Intra ID 를 입력해주세요.</Typography>
            ) : (
              // <Typography>{queryYear}년 {queryMonth}월 {searchIntraId}</Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                checkboxSelection
                disableRowSelectionOnClick
                // selectionModel={selectionModel}
                onCellClick={handleCellClick}
                onColumnHeaderClick={handleAllCheckbox}
                // onSelectionModelChange={(event) => {
                //   // console.log(event);
                //   setSelectionModel(event);
                //   const selectedIDs = new Set(event);
                //   const selectedRows = rows.filter((r) =>
                //     selectedIDs.has(r.id)
                //   );
                //   setSelectedRows(selectedRows);
                // }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserAttendanceDataTable;
