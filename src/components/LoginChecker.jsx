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

function LoginChecker() {
  const [open, setOpen] = useState(false);
  const [isLoginNeeded, setIsLoginNeeded] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = () => {
    localStorage.removeItem("accessToken");
  }
  useEffect(() => {
    try {
      const jwtToken = localStorage.getItem("accessToken");
      const decodedToken = jwt_decode(jwtToken);
      const expirationDate = decodedToken.exp * 1000;
      const currentTimestamp = Date.now();
      const isTokenExpired = expirationDate < currentTimestamp;
      setOpen(true);
      if (isTokenExpired) {
        setIsLoginNeeded(true);
      }
    } catch (error) {
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

export default LoginChecker;
