import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import AttendanceCalendar from "./AttendanceCalendar";
import OperatorTable from "./OperatorTable";
import apiManager from "api/apiManager";

function SettingPage() {
  const [userList, setUserList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadUserList = async () => {
    try {
      const response = await apiManager.get("/user/operatorStatus");
      setUserList(
        response.data.map((row) => {
          if (row.isOperator === true) {
            return { ...row, isOperator: "✅" };
          } else {
            return { ...row, isOperator: "❌" };
          }
        })
      );
    } catch (error) {
      setSnackbarOpen(true);
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserList();
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
        <OperatorTable data={userList} />
        <AttendanceCalendar />
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
