import { useState } from "react";
import DateSelector from "./DateSelector";
import MonthlyUserInfo from "./MonthlyUserInfo";
import MonthlyUserTable from "./MonthlyUserTable";
import MonthlyPerfectUserTable from "./MonthlyPerfectUserTable";
import UserAttendanceDataTable from "./UserAttedanceDataTable";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function DashboardPage() {
  const [dateQuery, setDateQuery] = useState({
    queryYear: "",
    queryMonth: "",
  });

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* EXPLAIN: 특정 연, 월 조회 컴포넌트  */}
        <DateSelector dateQuery={dateQuery} setDateQuery={setDateQuery} />

        {/* EXPLAIN: 이번 달 참여 인원 통계  */}
        <MonthlyUserInfo text="참여 인원" />
        <MonthlyUserInfo text="개근 인원" />

        {/* EXPLAIN: 이번 달 참여자 목록 테이블 */}
        <MonthlyUserTable />

        {/* EXPLAIN: 이번 달 개근자 목록 테이블 */}
        <MonthlyPerfectUserTable />

        {/* EXPLAIN: 출석 데이터 수정 */}
        <UserAttendanceDataTable />
      </Grid>
    </Container>
  );
}

export default DashboardPage;
