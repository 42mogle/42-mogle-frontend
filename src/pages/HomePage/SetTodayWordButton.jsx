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
import useStore from "../../store.js";

const SetTodayWordButton = () => {
  const { _intraId } = useStore((state) => state);

  const [open, setOpen] = useState(false);
  const [isSetTodayWord, setIsTodayWord] = useState(false);
  const [todayWord, setTodayWord] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = event.target.setTodayWord.value;
    try {
      const data = {
        intraId: _intraId,
        todayWord: inputValue,
      };
      const response = await apiManager.patch(`/operator/setTodayWord/`, data);

      if (response.status === 200) {
        setOpen(false);
        setIsTodayWord(true);
        setTodayWord(inputValue);
      }
    } catch (error) {
      console.log(error);
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
        open={isSetTodayWord}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          오늘의 단어가 "{todayWord}" 로 설정되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
};

export default SetTodayWordButton;
