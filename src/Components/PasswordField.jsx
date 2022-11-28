import TextField from "@mui/material/TextField";

const PasswordField = ({
  id,
  name,
  label,
  onChange,
  helperText,
  isRuleGood,
  isLengthGood,
  isSamePassword,
}) => {
  // console.log(isSamePassword, helperText);
  const error =
    id === "password" ? !(isRuleGood && isLengthGood) : !isSamePassword;
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      error={error}
      id={id}
      name={name}
      label={label}
      type="password"
      autoComplete="new-password"
      onChange={onChange}
      helperText={helperText}
    />
  );
};

export default PasswordField;
