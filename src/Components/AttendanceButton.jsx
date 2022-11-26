import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

const AttendanceButton = () => {
  const [open, setOpen] = useState(false);
  const [isSameWithTodayWord, setIsSameWithTodayWord] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TODO 서버와 통신해서 오늘의 단어 정답 여부 처리하기
  // TODO 오답일 경우 setIsSameWithTodayWord(false) 처리하기
  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="success"
        sx={{ mt: 3, width: 1 / 2 }}
      >
        출석체크
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {!isSameWithTodayWord && (
          <Alert severity="error">오늘의 단어와 일치하지 않습니다.</Alert>
        )}
        <DialogTitle>오늘의 단어를 입력해주세요.</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="todayWord"
            label="오늘의 단어"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>제출</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttendanceButton;
