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

const _oauth =
  "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-ffa1eb7dfe8ca1260f9d27ba33051536d23c76cd1ab09f489cb233c7e8e5e065&redirect_uri=http%3A%2F%2F10.19.220.34%3A3000%2Fauth&response_type=code";
const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const _intraId = event.target.intraId.value;
    const _password = event.target.password.value;
    try {
      const response = await axios.post(
        "http://10.19.247.186:3000/auth/login/",
        {
          intraId: _intraId,
          password: _password,
        }
      );
      if (response.status === 201) {
        console.log(response);
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      setIsErrorOccured(true);
      console.log(error);
    }

    axios
      .get("http://10.19.247.186:3000/auth/login/", {
        intraId: _intraId,
        password: _password,
      })
      .then((response) => console.log(response.data));
  };

  return (
    <>
      {state && state.isAlreadySignedUp && (
        <Alert severity="error" sx={{ mb: 3, width: "100%" }}>
          이미 존재하는 계정입니다.
        </Alert>
      )}
      <Typography component="h1" variant="h5">
        🌻 42 Morning Glory
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="intraId"
          label="Intra ID"
          name="intraId"
          autoComplete="intraId"
          autoFocus
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="비밀번호 기억하기"
        />
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
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
          href={_oauth}
          fullWidth
          variant="outlined"
          sx={{ mt: 1, mb: 2 }}
        >
          회원가입
        </Button>
      </Box>
    </>
  );
};

export default Login;
