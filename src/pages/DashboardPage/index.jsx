import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const START_YEAR = 2022;
const current_year = new Date().getFullYear();
const years = [];
for (let year = START_YEAR; year <= current_year; year += 1) {
  years.push(year.toString());
}

const months = [];
const current_month = new Date().getMonth() + 1;
for (let month = 1; month <= 12; month += 1) {
  months.push(month);
}

function DashboardPage() {
  const [selectYear, setSelectYear] = useState(current_year);
  const [selectMonth, setSelectMonth] = useState(current_month);
  const handleYear = (event) => {
    setSelectYear(event.target.value);
  };
  const handleMonth = (event) => {
    setSelectMonth(event.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="year-label">연도</InputLabel>
        <Select
          labelId="year"
          id="year"
          value={selectYear}
          label="Year"
          onChange={handleYear}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="month-label">월</InputLabel>
        <Select
          labelId="month"
          id="month"
          value={selectMonth}
          label="month"
          onChange={handleMonth}
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default DashboardPage;
