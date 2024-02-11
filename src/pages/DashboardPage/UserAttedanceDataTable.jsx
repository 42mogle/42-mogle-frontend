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
const HTTP_STATUS = require("http-status");

// TODO: 시간 추가하기
const columns = [{ field: "date", headerName: "날짜", width: 200 }];

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
  const [queryResultMessage, setQueryResultMessage] = useState("검색할 Intra ID 를 입력해주세요.");
  const [searchIntraId, setSearchIntraId] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const monthDays = getMonthDays(queryYear, queryMonth);
    const result = [];
    for (let day = 1; day <= monthDays; day += 1) {
      const row = format(new Date(queryYear, queryMonth - 1, day), "PPP EEEE", {
        locale: ko,
      });
      result.push({ id: day, date: row });
    }
    setRows(result);
  }, [queryYear, queryMonth, searchIntraId]);

  const handleCellClick = async (event) => {
    if (event.field === "__check__") {
      const { date } = event.row;
      const monthIdx = date.indexOf('월') + 2;
      const dayIdx = date.indexOf('일');
      const selectedDay = parseInt(date.slice(monthIdx, dayIdx), 10);
      const body = {
        "year": queryYear,
        "month": queryMonth,
        "day": selectedDay,
        "intraId": searchIntraId
      };
      if (event.value === false) {
        try {
          const response = await apiManager.post("operator/attendance-add", body);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await apiManager.post("operator/attendance-delete", body);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const loadUserAttendanceData = async () => {
    if (searchIntraId.length === 0) return;
    try {
      const response = await apiManager.get(
        `/operator/attendance-list/${queryYear}/${queryMonth}/${searchIntraId}`
      );
      setAttendanceLog(
        response.data.map((log) => {
          return format(new Date(log.timelog), "PPP EEEE", { locale: ko });
        })
      );
    } catch (error) {
      console.log(error);
      if (error.response.status === HTTP_STATUS.NOT_FOUND)
        setQueryResultMessage("존재하지 않는 유저입니다.");
      else
        setQueryResultMessage(error.response.data.message);
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
            {attendanceLog.length === 0 ? (
              <Typography>{queryResultMessage}</Typography>
            ) : (
              <CustomDataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                checkboxSelection
                disableSelectionOnClick
                onCellClick={handleCellClick}
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
