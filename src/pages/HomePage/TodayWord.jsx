import Typography from "@mui/material/Typography";

function TodayWord(props) {
  const {
    todayWord: { word, textColor, isTodayWordSet },
  } = props;

  return (
    <>
      <Typography variant="bod1" sx={{ mt: 1, color: textColor }}>
        {isTodayWordSet && "오늘의 단어: "}
        {word.length === 0 ? "오늘의 단어가 설정되지 않았습니다." : word}
      </Typography>
    </>
  );
}

export default TodayWord;
