import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function UserProfile(props) {
  const { intraId, photoUrl, isOperator } = props;
  return (
    <>
      <Avatar sx={{ width: 100, height: 100, mb: 3 }} src={photoUrl} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>{intraId} 님</Typography>
        {isOperator && (
          <Typography sx={{ color: "primary.main", fontSize: "0.85rem" }}>
            (Operator)
          </Typography>
        )}
      </Box>
    </>
  );
}

export default UserProfile;
