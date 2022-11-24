import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";

const Signup = () => {
  const navigate = useNavigate();
  const { state, isErrorOccured } = useLocation();
  // 비밀번호 규칙 확인용 State (boolean)
  // const [isValidPassword, setIsValidPassword] = useState(true);
  const [isSamePassword, setIsSamePassword] = useState(true);
  // 사용자 입력 비밀번호 저장 State (string)
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  // 비밀번호 규칙 검증용 State (boolean)
  const [isLengthGood, setLengthGood] = useState(true);
  const [isRuleGood, setRuleGood] = useState(true);
  // 비밀번호 검증 시 에러 메세지 설정용 State (string)
  const [validPasswordMessage, setValidPasswordMessage] = useState("");
  const [backPasswordError, setBackPasswordError] = useState(false);

  const onChangePassword = useCallback((event) => {
    const currentPassword = event.target.value;
    setFirstPassword(currentPassword);
    console.log(`first: ${firstPassword} / second: ${secondPassword}`);

    const ruleRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])[\da-zA-Z!@#$%^*+=-]{8,}$/;
    // Explain : 비밀번호 길이는 8자 ~ 20자 사이
    currentPassword.length > 7 && currentPassword.length < 21
      ? setLengthGood(true)
      : setLengthGood(false);
    // Explain : 특수문자, 대문자, 소문자, 길이 모두 확인하는 정규식
    ruleRegex.test(currentPassword) === true
      ? setRuleGood(true)
      : setRuleGood(false);
    !(secondPassword === "")
      ? currentPassword === secondPassword
        ? setIsSamePassword(true)
        : setIsSamePassword(false)
      : setIsSamePassword(true);
    // Explain : 비밀번호 틀린 이유 작성
    if (!isLengthGood && !isRuleGood) {
      setValidPasswordMessage(
        "비밀번호는 8 ~ 20자, 대문자 소문자 특수문자를 포함합니다"
      );
    } else if (!isLengthGood && isRuleGood) {
      setValidPasswordMessage("8 ~ 20자로 맞춰주세요");
    } else if (isLengthGood && !isRuleGood) {
      setValidPasswordMessage(
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함합니다."
      );
    }
  });

  const checkSecondPassword = useCallback((event) => {
    const currentPassword = event.target.value;
    setSecondPassword(currentPassword);

    firstPassword === currentPassword
      ? setIsSamePassword(true)
      : setIsSamePassword(false);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const _serverUrl = `http://10.19.247.186:3042/auth/secondJoin/`;
    // TODO 비밀번호 규칙 검사하기
    try {
      const response = await axios.post(_serverUrl, {
        intraId: state.intraId,
        password: secondPassword,
        imageURL: null,
      });
      console.log(response);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      setBackPasswordError(true);
      console.log(error);
    }
  };

  if (state) {
    return (
      <>
        {backPasswordError && (
          <Alert severity="error" sx={{ mb: 3, width: "100%" }}>
            오류가 발생했습니다. 다시 시도해주세요.
          </Alert>
        )}
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

          {isLengthGood && isRuleGood ? (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onChangePassword}
              autoComplete="new-password"
            />
          ) : (
            <TextField
              margin="normal"
              error
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onChangePassword}
              autoComplete="new-password"
              helperText={validPasswordMessage}
            />
          )}

          {isSamePassword ? (
            <TextField
              margin="normal"
              required
              fullWidth
              name="validatePassword"
              label="Re-enter Password"
              type="password"
              id="validatePassword"
              autoComplete="new-password"
              onChange={checkSecondPassword}
            />
          ) : (
            <TextField
              margin="normal"
              error
              required
              fullWidth
              name="validatePassword"
              label="Re-enter Password"
              type="password"
              id="validatePassword"
              autoComplete="new-password"
              onChange={checkSecondPassword}
              helperText="비밀번호가 일치하지 않습니다."
            />
          )}

          <Typography component="h6" variant="body2">
            비밀번호는 아래의 규칙에 맞게 작성해주세요.
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem color="success">
              <ListItemIcon>
                <CheckIcon
                  color={
                    isLengthGood && firstPassword !== ""
                      ? "success"
                      : "disabled"
                  }
                ></CheckIcon>
              </ListItemIcon>
              <ListItemText
                disableTypography
                secondary={
                  <Typography
                    type="body2"
                    variant="subtitle2"
                    style={
                      isLengthGood && firstPassword !== ""
                        ? { color: "green" }
                        : { color: "grey" }
                    }
                  >
                    8 ~ 20자 사이
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon
                  color={
                    isRuleGood && firstPassword !== "" ? "success" : "disabled"
                  }
                ></CheckIcon>
              </ListItemIcon>
              <ListItemText
                disableTypography
                secondary={
                  <Typography
                    type="body2"
                    variant="subtitle2"
                    style={
                      isRuleGood && firstPassword !== ""
                        ? { color: "green" }
                        : { color: "grey" }
                    }
                  >
                    영문 대/소문자, 숫자, 특수문자 조합
                  </Typography>
                }
              />
              <ListItemText secondary="" />
            </ListItem>
          </List>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              !(
                isLengthGood &&
                isRuleGood &&
                isSamePassword &&
                secondPassword !== ""
              )
            }
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
