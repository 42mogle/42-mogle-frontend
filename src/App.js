import { Route, Routes } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import Auth from "./pages/Auth";

function App() {
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </MobileLayout>
  );
}

export default App;
