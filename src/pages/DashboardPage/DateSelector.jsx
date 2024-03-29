import { useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

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

function DateSelector(props) {
  const { setDateQuery } = props;
  const [selectYear, setSelectYear] = useState(current_year);
  const [selectMonth, setSelectMonth] = useState(current_month);

  const handleYear = (event) => {
    setSelectYear(event.target.value);
  };
  const handleMonth = (event) => {
    setSelectMonth(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setDateQuery({
      queryYear: selectYear,
      queryMonth: selectMonth,
    })
  };

  return (
    <Grid
      container
      item
      xs={12}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Grid item xs={1}>
        <FormControl>
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
        </FormControl>
      </Grid>

      <Grid item xs={1}>
        <FormControl>
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
      </Grid>

      <Grid item xs={1}>
        <Button type="submit" variant="outlined" sx={{ height: "100%" }}>
          조회
        </Button>
      </Grid>
    </Grid>
  );
}

export default DateSelector;
