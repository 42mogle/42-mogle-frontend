import React, { useState } from "react";
import apiManager from "../../api/apiManager.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const HTTP_STATUS = require("http-status");

const SetTodayWordButton = () => {
  const [open, setOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isErrorOccured, setIsErrorOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [todayWord, setTodayWord] = useState("");

  const handleClickOpen = () => {
    setIsErrorOccurred(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = event.target.setTodayWord.value;
    try {      
      const data = {
        todayWord: inputValue,
      };
      const response = await apiManager.patch(`/operator/setTodayWord/`, data);

      if (response.status === HTTP_STATUS.OK) {
        setOpen(false);
        setIsSnackbarOpen(true);
        setTodayWord(inputValue);
      }
    } catch (error) {
      console.log(error);
      setIsErrorOccurred(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        align="center"
        sx={{ mt: 3, width: 1 / 2 }}
      >
        오늘의 단어 설정
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {isErrorOccured && (
          <Alert severity="warning" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        )}
        <DialogTitle>오늘의 단어를 설정해주세요.</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="setTodayWord"
              label="오늘의 단어"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button type="submit">제출</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbar}
      >
        <Alert
          onClose={handleSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          오늘의 단어가 "{todayWord}" 로 설정되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
};

export default SetTodayWordButton;
