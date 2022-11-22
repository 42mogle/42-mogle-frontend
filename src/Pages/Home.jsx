import React, { useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Home = (props) => {
  return (
    <>
      <Avatar
        sx={{ width: 100, height: 100, mb: 3 }}
        src="https://i.ytimg.com/vi/AwrFPJk_BGU/maxresdefault.jpg"
      ></Avatar>
      <Typography component="body1">{props.name} 모닝글로리 님</Typography>
      <Box>

      </Box>
    </>
  );
};

export default Home;
