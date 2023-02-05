import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import apiManager from "../api/apiManager.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import jwt_decode from "jwt-decode";
import useStore from "../store.js";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setIntraId, setIsClickedPasswordReset } = useStore((state) => state);
  const [isErrorOccurred, setisErrorOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signupSnackbarOpen, setSignupSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSignupSnackbarOpen(false);
  };

  useEffect(() => {
    if (state && state.isSignupSuccess) {
      setSignupSnackbarOpen(true);
    }
    setIsClickedPasswordReset(false);
  }, []);

  const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const expirationDate = decodedToken.exp * 1000;
    const currentTimestamp = Date.now();
    return (expirationDate < currentTimestamp);
  }

  const checkLoginStatus = () => {
    const jwtToken = localStorage.getItem("accessToken");
    if (jwtToken === null)
      return ;
    if (isTokenExpired(jwtToken))
    {
      localStorage.removeItem("accessToken");
      return ;
    }
    navigate(-1);
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const _intraId = event.target.intraId.value;
    const _password = event.target.password.value;
    if (_password.length === 0) {
      setErrorMessage("비밀번호를 입력해주세요.");
      setisErrorOccurred(true);
      return;
    }
    try {
      const data = {
        intraId: _intraId,
        password: _password,
      };
      const response = await apiManager.post(`/serverAuth/login/`, data);
      if (response.status === 201) {
        setisErrorOccurred(false);
        setIntraId(_intraId);
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setisErrorOccurred(true);
    }
  };

  return (
    <>
      {state && state.error && (
        <Alert severity="error" sx={{ mb: 3, width: "100%" }}>
          {state.error.message}
        </Alert>
      )}
      {isErrorOccurred && (
        <Alert severity="error" sx={{ mb: 3, width: "100%" }}>
          {errorMessage}
        </Alert>
      )}
      <Typography component="h1" variant="h5">
        🌻 42 Morning Glory
      </Typography>
      <Box
        component="form"
        onSubmit={handleLoginSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="intraId"
          label="Intra ID"
          name="intraId"
          autoComplete="intraId"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Grid container>
          <Grid item xs>
            <Link
              onClick={() => {
                setIsClickedPasswordReset(true);
              }}
              href={process.env.REACT_APP_OAUTH_URL}
              variant="body2"
            >
              비밀번호가 기억나지 않으신가요?
            </Link>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          로그인
        </Button>
        <Button
          component={Link}
          href={process.env.REACT_APP_OAUTH_URL}
          fullWidth
          variant="outlined"
          sx={{ mt: 1, mb: 2 }}
        >
          회원가입
        </Button>
        {state && state.isSignupSuccess && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={signupSnackbarOpen}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              회원가입이 완료되었습니다.
            </Alert>
          </Snackbar>
        )}
      </Box>
    </>
  );
};

export default Login;
