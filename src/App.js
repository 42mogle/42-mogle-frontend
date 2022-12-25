import { Route, Routes } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import Auth from "./pages/Auth";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route element={<DesktopLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
