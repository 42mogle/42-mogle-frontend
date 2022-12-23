import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props) => {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/42Mogle" target="_blank">
          42 Morning Glory
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        <Link color="inherit" href="https://forms.gle/mD9PrqFtAxj5Hpjh9" target="_blank">
          버그 제보
        </Link>{" "}
      </Typography>
    </>
  );
};

export default Copyright;
