import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getServerStatus from "@utils/getServerStatus";
import MobileLayout from "@components/MobileLayout";
import DesktopLayout from "@components/DesktopLayout";
import Login from "@pages/Login";
import HomePage from "@pages/HomePage";
import Signup from "@pages/SignupPage";
import Auth from "@pages/Auth";
import DashboardPage from "@pages/DashboardPage";
import SettingPage from "@pages/SettingPage";
import ClosedPage from "@pages/ClosedPage";
import NotFoundPage from "@pages/NotFoundPage";
import RouteChangeTracker from "@components/RouteChangeTracker";

function App() {
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    getServerStatus()
      .then((status) => {
        setServerStatus(status);
      })
      .catch((error) => {
        console.error(error);
        setServerStatus(false);
      });
  }, []);

  if (serverStatus === null) {
    return <div></div>;
  } else if (serverStatus === false) {
    return <ClosedPage />;
  } else {
    return (
      <>
        <RouteChangeTracker />
        <Routes>
          <Route element={<MobileLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/reset-password" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route element={<DesktopLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/setting" element={<SettingPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
