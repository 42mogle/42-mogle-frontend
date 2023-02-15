import { Route, Routes } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import Auth from "./pages/Auth";
import DashboardPage from "./pages/DashboardPage";
import SettingPage from "./pages/SettingPage";
import ClosedPage from "./pages/ClosedPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/closed" element={<ClosedPage />} />
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
      </Routes>
    </>
  );
}

export default App;
