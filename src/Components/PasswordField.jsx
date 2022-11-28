import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import useStore from "../store.js";

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
