import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function MonthlyUserInfo(props) {
  const { text, data } = props;
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {text}
          </Typography>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box>
            <Typography variant="h5" component="span">
              {data}
            </Typography>
            <Typography sx={{ ml: 1 }} component="span" color="text.secondary">
              명
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MonthlyUserInfo;
