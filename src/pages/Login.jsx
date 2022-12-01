import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import useStore from "../store.js";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { _intraId, setIntraId } = useStore((state) => state);
  const [inputIntraId, setInputIntraId] = useState("");
  const [isErrorOccurred, setisErrorOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [findPassword, clickFindPassword] = useState(false);

  const handleInputIntraId = (event) => {
    setInputIntraId(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const _intraId = event.target.intraId.value;
    const _password = event.target.password.value;
    if (_password.length === 0) {
      setErrorMessage("비밀번호를 입력해주세요.");
      setisErrorOccurred(true);
      return ;
    }
    try {
      const response = await axios.post(`https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/serverAuth/login/`, {
        intraId: _intraId,
        password: _password,
      });
      if (response.status === 201) {
        setisErrorOccurred(false);
        setIntraId(_intraId);
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setisErrorOccurred(true);
    }
  };

  return (
    <>
      {state && state.isAlreadySignedUp && (
        <Alert severity="error" sx={{ mb: 3, width: "100%" }}>
          이미 존재하는 계정입니다.
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
          value={_intraId === "" ? inputIntraId : _intraId}
          onChange={handleInputIntraId}
          autoComplete="intraId"
          autoFocus={_intraId === "" ? false : true}
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
          autoFocus={_intraId && true}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="비밀번호 기억하기"
        />
        <Grid container>
          <Grid item xs>
            <Link
              onClick={() => {
                clickFindPassword(true);
              }}
              href="#"
              variant="body2"
            >
              {findPassword === false
                ? `비밀번호가 기억나지 않으신가요?`
                : `죄송합니다! 백엔드에서 기능 구현중입니다!`}
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
      </Box>
      <Typography>TEST2</Typography>
    </>
  );
};

export default Login;
