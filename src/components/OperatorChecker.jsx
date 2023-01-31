import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import jwt_decode from "jwt-decode";
import apiManager from "api/apiManager";
const HTTP_STATUS = require("http-status");

/*
  EXPLAIN

  1. jwt 토큰 여부 확인
    - false: 이전 페이지로 이동
  2. 오퍼레이터 여부 확인
    - false: 이전 페이지로 이동
  3. 토큰 만료 여부 확인
    - false: 토큰 만료 안내 팝업창 표시

*/

function OperatorChecker() {
  const [open, setOpen] = useState(false);
  const [isLoginNeeded, setIsLoginNeeded] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = () => {
    localStorage.removeItem("accessToken");
  };

  const isOperator = async () => {
    try {
      const response = await apiManager.get('/user/operator-check');
      console.log(response);
      if (response.status === HTTP_STATUS.OK)
        return (true);
      return (false);
    } catch (error) {
      return (false);
    }
  }
  useEffect(() => {
    try {
      const jwtToken = localStorage.getItem("accessToken");
      if (jwtToken === null) {
        navigate(-1);
      }
      if (isOperator() === false) {
        navigate(-1);
      }
      const decodedToken = jwt_decode(jwtToken);
      const expirationDate = decodedToken.exp * 1000;
      const currentTimestamp = Date.now();
      const isTokenExpired = expirationDate < currentTimestamp;
      if (isTokenExpired) {
        setOpen(true);
        setIsLoginNeeded(true);
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }, []);

  return (
    <>
      {isLoginNeeded && (
        <Dialog open={open}>
          <DialogTitle>안내</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              토큰이 만료되었습니다. 로그인을 다시 해주세요.
            </DialogContentText>
            <DialogActions>
              <Button component={Link} href="/" onClick={handleRedirect}>
                로그인 페이지로 돌아가기
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default OperatorChecker;
