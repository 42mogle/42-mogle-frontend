import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function UserProfile(props) {
	const { intraId } = props;
  return (
    <>
      <Avatar
        sx={{ width: 100, height: 100, mb: 3 }}
        src="https://i.ytimg.com/vi/AwrFPJk_BGU/maxresdefault.jpg"
      />
      <Typography variant="body1">{intraId} 님</Typography>
    </>
  );
}

export default UserProfile;
