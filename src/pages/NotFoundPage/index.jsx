import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function NotFoundPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        height="100vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" align="center">
          Sorry. Page not found!
        </Typography>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
