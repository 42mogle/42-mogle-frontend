import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// 오늘 날짜를 "yyyy년 MM월 dd일 e요일" 형식으로 변환
const getTodayDate = () => {
  const todayDate = new Date();
  return `${format(todayDate, "PPP EEEE", { locale: ko })}`;
};

function TodayDate() {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
        {getTodayDate()}
      </Typography>
    </>
  );
}

export default TodayDate;
