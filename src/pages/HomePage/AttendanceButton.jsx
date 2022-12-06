import React, { useState, useEffect } from "react";
import apiManager from "../../api/apiManager.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import useStore from "../../store.js";

const AttendanceButton = () => {
  const [open, setOpen] = useState(false);
  const [buttonStatus, setButton] = useState(true);
  const [buttonLetter, setButtonLetter] = useState("출석체크");
  const [isSameWithTodayWord, setIsSameWithTodayWord] = useState(true);
  const { _intraId, _isAttended, setIsAttended } = useStore((state) => state);

  const handleClickOpen = () => {
    setOpen(true);
    setIsSameWithTodayWord(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValue = event.target.todayWord.value;

    try {
      const data = {
        todayWord: inputValue,
      };
      const response = await apiManager.post(
        `/attendance/userAttendance`,
        data
      );

      if (response.status === 201) {
        if (response.data.statusAttendance === 0) {
          setOpen(false);
          setIsAttended(true);
        } else if (response.data.statusAttendance === 2) {
          setIsSameWithTodayWord(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkButtonStatus = async () => {
    try {
      const response = await apiManager.get(
        `/attendance/${_intraId}/buttonStatus`
      );
      setButton(response.data);

      if (response.data === 1) setButtonLetter("출석가능 시간이 아닙니다.");
      else if (response.data === 2)
        setButtonLetter("이미 출석체크를 완료했습니다.");
      else if (response.data === 3)
        setButtonLetter("오늘의 단어가 아직 설정되지 않았습니다.");
    } catch (error) {
      console.log(error);
    }
  };
  // TODO 출석이 완료되면 출석 정보가 업데이트 되도록 수정하기
  useEffect(() => {
    checkButtonStatus();
  }, [_isAttended]);

  return (
    <>
      <Button
        disabled={buttonStatus !== 0 ? true : false}
        onClick={handleClickOpen}
        variant="contained"
        color="success"
        align="center"
        sx={{ mt: 3, width: "auto" }}
      >
        {buttonLetter}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {!isSameWithTodayWord && (
          <Alert severity="error">오늘의 단어와 일치하지 않습니다.</Alert>
        )}
        <DialogTitle>오늘의 단어를 입력해주세요.</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
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
            <Button type="submit">제출</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default AttendanceButton;
