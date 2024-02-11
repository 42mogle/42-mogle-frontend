import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Typography from "@mui/material/Typography";

import { format } from "date-fns";

import apiManager from "api/apiManager";

const DateType = {
  WEEKDAY: 0,
  WEEKEND: 1,
  SUPPLEMENT: 2,
};

function ServerDay(props) {
  const { dateMockup, day, outsideCurrentMonth, ...other } = props;

  const dayString = format(props.day, "d");
  const type = dateMockup.get(Number(dayString));
  let badgeIcon;

  if (type === DateType.WEEKDAY) {
    badgeIcon = "🌞";
  } else if (type === DateType.WEEKEND) {
    badgeIcon = "🌚";
  } else if (type === DateType.SUPPLEMENT) {
    badgeIcon = "💧";
  }

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={badgeIcon}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const dateMockup = new Map();
dateMockup.set(1, DateType.WEEKDAY);
dateMockup.set(2, DateType.WEEKDAY);
dateMockup.set(3, DateType.WEEKEND);
dateMockup.set(4, DateType.SUPPLEMENT);

function AttendanceCalendar(props) {
  const { data } = props;

  const handleChange = (date) => {
    const dayString = format(date, "d");
    const dayNumber = Number(dayString);
    dateMockup.set(dayNumber, DateType.SUPPLEMENT);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            월별 출석 일자 관리
          </Typography>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar
                slots={{ day: ServerDay }}
                slotProps={{ day: { dateMockup } }}
                onChange={handleChange}
              />
            </LocalizationProvider>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default AttendanceCalendar;
