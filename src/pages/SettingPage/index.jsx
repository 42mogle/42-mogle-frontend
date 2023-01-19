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

function SettingPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadCurrentMonthData = async () => {
    try {
      const response = await apiManager.get(
        `/statistic/monthly-users/${dateQuery.queryYear}/${dateQuery.queryMonth}`
      );
      setResultDate({ year: dateQuery.queryYear, month: dateQuery.queryMonth });
    } catch (error) {
      setSnackbarOpen(true);
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    loadCurrentMonthData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* EXPLAIN: 오퍼레이터 권한 수정 */}
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

export default SettingPage;
