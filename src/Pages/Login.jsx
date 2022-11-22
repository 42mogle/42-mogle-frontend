import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const _url = "10.19.213.129";
const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://10.19.213.129:3000/user/", {
        withCredentials: true,
      })
      .then((response) => console.log(response.data));
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        🌻 42 Morning Glory
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="intraID"
          label="Intra ID"
          name="intraID"
          autoComplete="intraID"
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
          to="/signIn"
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
