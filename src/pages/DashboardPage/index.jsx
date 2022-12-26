import { useState } from "react";
import DateSelector from "./DateSelector";
import MonthlyUserInfo from "./MonthlyUserInfo";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

function DashboardPage() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {/* EXPLAIN: 특정 연, 월 조회 컴포넌트  */}
        <DateSelector />

        {/* EXPLAIN: 이번 달 참여 인원 통계  */}
        <MonthlyUserInfo text="이번 달 참여 인원" />
        <MonthlyUserInfo text="이번 달 개근 인원" />

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          ></Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
