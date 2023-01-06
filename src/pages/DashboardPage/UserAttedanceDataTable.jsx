import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import apiManager from "api/apiManager";
import axios from "axios";

// TODO: 시간 추가하기
const columns = [
  { field: "date", headerName: "날짜", width: 200 },
  { field: "time", headerName: "시간", width: 200 },
];

const getMonthDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
    {
      display: "none",
    },
}));

function UserAttendanceDataTable(props) {
  const {
    data: { queryYear, queryMonth },
  } = props;
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [searchIntraId, setSearchIntraId] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);

  const rows = [];
  const monthDays = getMonthDays(queryYear, queryMonth);
  for (let day = 1; day <= monthDays; day += 1) {
    const row = format(new Date(queryYear, queryMonth - 1, day), "PPP EEEE", {
      locale: ko,
    });
    rows.push({ id: day, date: row, time: "" });
  }

  const handleCellClick = (event) => {
    if (event.field === "__check__") console.log(event);
  };
  const handleAllCheckbox = (event) => {
    if (event.field === "__check__") console.log(event);
  };
  const loadUserAttendanceData = async () => {
    if (searchIntraId.length === 0) return;
    try {
      // const response = await apiManager.get(
      //   `/operator/attendance-list/${queryYear}/${queryMonth}/${searchIntraId}`
      // );
      const response = await axios.get("http://localhost:8000/attendance-list");
      setAttendanceLog(
        response.data.map((log) => {
          return format(new Date(log.timelog), "PPP EEEE", { locale: ko });
          // const logDate = new Date(log.timelog);
          // return {
          //   date: format(logDate, "PPP EEEE", { locale: ko }),
          //   time: format(logDate, "hh:mm:ss"),
          // };
        })
      );
    } catch (error) {
      console.log(error);
      setAttendanceLog([]);
    }
  };

  useEffect(() => {
    loadUserAttendanceData();
  }, [queryYear, queryMonth, searchIntraId]);

  useEffect(() => {
    setSelectionModel(
      rows
        .filter((row) => {
          if (attendanceLog.includes(row.date)) {
            return row;
          }
        })
        .map((row) => row.id)
    );
  }, [attendanceLog]);

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
            year={queryYear}
            month={queryMonth}
          />
          <Box sx={{ mt: 1, height: 400, width: "100%" }}>
            {searchIntraId.length === 0 ? (
              <Typography>검색할 Intra ID 를 입력해주세요.</Typography>
            ) : (
              // <Typography>{queryYear}년 {queryMonth}월 {searchIntraId}</Typography>

              // 모든 체크박스 선택기능 해제
              <CustomDataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                checkboxSelection
                disableSelectionOnClick
                onColumnHeaderClick={handleAllCheckbox}
                selectionModel={selectionModel}
                onSelectionModelChange={(event) => {
                  setSelectionModel(event);
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserAttendanceDataTable;
