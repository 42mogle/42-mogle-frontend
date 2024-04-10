import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import apiManager from "@api/apiManager";
import AttendanceCalendar from "./AttendanceCalendar";
import OperatorTable from "./OperatorTable";
import SearchBar from "@components/SearchBar";

function SettingPage() {
  const [userList, setUserList] = useState([]);
  const [displayedUserList, setDisplayedUserList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchIntraId, setSearchIntraId] = useState("");

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
      setDisplayedUserList(
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

  // EXPLAIN: 인트라 아이디 검색 시 유저 필터링
  useEffect(() => {
    setDisplayedUserList(
      userList.filter((user) => {
        const regex = new RegExp(searchIntraId, "gi");
        return user.intraId.match(regex);
      })
    );
  }, [searchIntraId]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                오퍼레이터 권한 수정
              </Typography>
              <SearchBar
                searchQuery={searchIntraId}
                setSearchQuery={setSearchIntraId}
              />
              <OperatorTable data={displayedUserList} />
            </CardContent>
          </Card>
        </Grid>
        {/* EXPLAIN: 오퍼레이터 권한 수정 */}
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
