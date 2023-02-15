import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClosedPageLayout from "./ClosedPageLayout";

const backgroundImage =
  "https://images.unsplash.com/photo-1614071826537-075aa3de09a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2573&q=80";

function Closed() {
  return (
    <>
      <ClosedPageLayout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "#7fc7d9", // Average color of the background image.
          backgroundPosition: "center",
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography
          color="inherit"
          align="center"
          variant="h3"
          marked="center"
          sx={{ mb: 4 }}
        >
          Sorry. We are closed now!
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
        >
          모닝글로리 사이트 운영시간은 오전 9시부터 오후 6시입니다.
        </Typography>
        <Typography color="inherit" align="center" variant="h5" sx={{ mb: 4 }}>
          문의사항은 모닝글로리 채널에 부탁드립니다.
        </Typography>
      </ClosedPageLayout>
    </>
  );
}

export default Closed;
