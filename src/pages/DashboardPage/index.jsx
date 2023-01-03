import { useState, useEffect } from "react";
import DateSelector from "./DateSelector";
import MonthlyUserInfo from "./MonthlyUserInfo";
import MonthlyUserTable from "./MonthlyUserTable";
import MonthlyPerfectUserTable from "./MonthlyPerfectUserTable";
import UserAttendanceDataTable from "./UserAttedanceDataTable";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import apiManager from "api/apiManager";

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;

function DashboardPage() {
  const [dateQuery, setDateQuery] = useState({
    queryYear: currentYear,
    queryMonth: currentMonth,
  });
  const [resultDate, setResultDate] = useState({
    year: currentYear,
    month: currentMonth,
  });
  const [monthlyStatistic, setMonthlyStatistic] = useState([]);
  const [monthlyTotalUser, setMonthlyTotalUser] = useState(0);
  const [monthlyPerfectUser, setMonthlyPerfectUser] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getMonthlyTotalUser = (data) => {
    return data.reduce((acc) => (acc += 1), 0);
  };

  const getMonthlyPerfectUser = (data) => {
    return data.reduce((acc, user) => {
      if (user.isPerfect === true) return acc + 1;
      return acc;
    }, 0);
  };

  const loadCurrentMonthData = async () => {
    try {
      const response = await apiManager.get(
        `/statistic/monthly-users/${dateQuery.queryYear}/${dateQuery.queryMonth}`
      );
      setMonthlyTotalUser(getMonthlyTotalUser(response.data));
      setMonthlyPerfectUser(getMonthlyPerfectUser(response.data));
      setMonthlyStatistic(response.data);
      setResultDate({ year: dateQuery.queryYear, month: dateQuery.queryMonth });
    } catch (error) {
      setSnackbarOpen(true);
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    loadCurrentMonthData();
  }, [dateQuery]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* EXPLAIN: 특정 연, 월 조회 컴포넌트  */}
        <DateSelector setDateQuery={setDateQuery} />

        {/* EXPLAIN: 이번 달 참여 인원 통계  */}
        <MonthlyUserInfo data={monthlyTotalUser} text="참여 인원" />
        <MonthlyUserInfo data={monthlyPerfectUser} text="개근 인원" />

        {/* EXPLAIN: 이번 달 참여자 목록 테이블 */}
        <MonthlyUserTable data={monthlyStatistic} resultDate={resultDate} />

        {/* EXPLAIN: 이번 달 개근자 목록 테이블 */}
        <MonthlyPerfectUserTable data={monthlyStatistic} />

        {/* EXPLAIN: 출석 데이터 수정 */}
        <UserAttendanceDataTable data={dateQuery} />
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DashboardPage;
