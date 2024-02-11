import { Button } from "@mui/material";

import apiManager from "@api/apiManager.js";
import useStore from "@utils/store.js";

function TestButtons() {
  const { _intraId } = useStore((state) => state);

  const handleRequest = async () => {
    try {
      const response = await apiManager.get(`/serverAuth/test0`);
      console.log("handleRequest", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserData = async () => {
    try {
      const response = await apiManager.get(
        `/statistic/${_intraId}/userAttendanceState`
      );
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
