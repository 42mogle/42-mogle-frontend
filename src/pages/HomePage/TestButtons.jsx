import axios from "axios";
import { Button } from "@mui/material";
import useStore from "../../store.js";

function TestButtons() {
  const { _intraId } = useStore((state) => state);

  const handleRequest = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      console.log(process.env.REACT_APP_AWS_BACKEND_SERVER);
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/serverAuth/test0/`
      , config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserData = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get(
        `https://${process.env.REACT_APP_AWS_BACKEND_SERVER}/statistic/${_intraId}/userAttendanceState`
      , config);
      console.log("handleUserData", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="warning"
        onClick={handleRequest}
        sx={{ mt: 3, width: 1 / 2 }}
      >
        회원가입/로그인 요청 테스트
      </Button>
      <Button
        variant="outlined"
        color="warning"
        onClick={handleUserData}
        sx={{ mt: 3, width: 1 / 2 }}
      >
        유저 로그 요청 테스트
      </Button>
    </>
  );
}

export default TestButtons;
