import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Signup = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const _serverUrl = `http://10.19.247.186:3042/auth/secondJoin/`;
    const password = event.target.password.value;
    const validatePassword = event.target.validatePassword.value;
    // TODO 비밀번호 규칙 검사하기
    if (password === validatePassword) {
      console.log("OK");
      try {
        const response = await axios.post(_serverUrl, {
          intraId: state.intraId,
          password: password,
          imageURL: null,
        });
        console.log(response);
        if (response.status === 201) {
          // TODO 서버에서 받은 JWT 토큰 상태관리하기
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
    }
  };

  if (state.intraId !== undefined) {
    return (
      <>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            variant="filled"
            disabled
            value={state.intraId}
            fullWidth
            id="intraId"
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
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="validatePassword"
            label="Re-enter Password"
            type="password"
            id="validatePassword"
            autoComplete="new-password"
          />
          <Typography component="h6" variant="body2">
            비밀번호는 아래의 규칙에 맞게 작성해주세요.
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemIcon>
                <CheckIcon></CheckIcon>
              </ListItemIcon>
              <ListItemText secondary="10~20자 사이" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon></CheckIcon>
              </ListItemIcon>
              <ListItemText secondary="영문 대/소문자, 숫자, 특수문자 조합" />
            </ListItem>
          </List>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            확인
          </Button>
        </Box>
      </>
    );
  } else {
    return (
      <Typography component="h1" variant="h4">
        잘못된 접근입니다.
      </Typography>
    );
  }
};

export default Signup;
