import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function UserProfile(props) {
  const { intraId, photoUrl } = props;
  return (
    <>
      <Avatar sx={{ width: 100, height: 100, mb: 3 }} src={photoUrl} />
      <Typography variant="body1">{intraId} 님</Typography>
    </>
  );
}

export default UserProfile;
