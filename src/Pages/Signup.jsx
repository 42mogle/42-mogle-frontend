import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Input } from "@mui/material";
import { useState } from "react";


const Signup = () => {
  
  // 비밀번호 규칙 확인용 State (boolean)
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isSamePassword, setIsSamePassword] = useState(true);
  // 사용자 입력 비밀번호 저장 State (string)
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  // 비밀번호 규칙 검증용 State (boolean)
  const [isLengthGood, setLengthGood] = useState(true);
  const [isRuleGood, sesRuleGood] = useState(true);

  const onChangePassword = (event) => {
    setFirstPassword(event.target.value);
    console.log(firstPassword);
    // TODO 비밀번호 규칙에 맞는가? => 정규식
    const ruleRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$");
    // Length Check Login
    (firstPassword.length > 6 && firstPassword.length < 20 ?  setLengthGood(true) : setLengthGood(false))
    
    if(isLengthGood && isRuleGood)
      return(null);
    else
      return("error");
    // return(`<TextField
    //   margin="normal"
    //   variant="filled"
    //   ${isError}
    //   value="인트라 ID"
    //   fullWidth
    //   id="intraId"
    //   name="intraId"
    //   autoComplete="intraId"
    //   autoFocus
    // />`);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("10.19.213.129/user/", {
        intraId: "hello",
		password: "world"
      })
      .then((response) => console.log(response.data));
  };

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
          value="인트라 ID"
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
          // {onChangePassword();}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={onChangePassword}
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
          <ListItem sx={{ pt: 0, pb: 0 }}>
            <ListItemIcon>
              <CheckIcon></CheckIcon>
            </ListItemIcon>
            <ListItemText secondary="8~20자 사이" />
          </ListItem>
          <ListItem sx={{ pt: 0, pb: 0 }}>
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
};

export default Signup;
