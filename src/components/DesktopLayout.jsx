import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import jwt_decode from "jwt-decode";

import OperatorChecker from "./OperatorChecker";
import apiManager from "@api/apiManager";
const HTTP_STATUS = require("http-status");

const drawerWidth = 240;

function DesktopLayout(props) {
  const [intraId, setIntraId] = useState("");
  const [userPhotoUrl, setUserPhotoUrl] = useState("");

  const getUserPhotoUrl = async () => {
    try {
      const response = await apiManager.get("/user/getUserInfo");
      if (response.status === HTTP_STATUS.OK) {
        setUserPhotoUrl(response.data.photoUrl);
      }
    } catch (error) {
      console.log(error);
      setUserPhotoUrl("https://i.ytimg.com/vi/AwrFPJk_BGU/maxresdefault.jpg");
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("accessToken");
    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken);
      setIntraId(decodedToken.intraId);
      getUserPhotoUrl();
    }
  }, []);

  return (
    <>
      <OperatorChecker />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "white",
            color: "black",
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              🌻 42 Morning Glory
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem>
                <CardHeader
                  avatar={
                    <Avatar
                      src={userPhotoUrl}
                      sx={{ bgcolor: "red[500]", boxShadow: "3" }}
                      aria-label="profile"
                    />
                  }
                  title={intraId}
                  subheader="Operator"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton href="/dashboard">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="시즌별 통계" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton href="/dashboard/setting">
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="설정" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Children components */}
            <Outlet />
            {/* Children components */}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default DesktopLayout;
