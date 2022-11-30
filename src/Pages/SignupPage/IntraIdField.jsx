import TextField from "@mui/material/TextField";

function IntraIdField({ intraId }) {
  return (
    <TextField
      margin="normal"
      variant="filled"
      disabled
      value={intraId}
      fullWidth
      id="intraId"
      name="intraId"
      autoComplete="intraId"
      autoFocus
    />
  );
}

export default IntraIdField;
