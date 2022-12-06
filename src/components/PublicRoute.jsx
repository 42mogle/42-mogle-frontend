import { Navigate } from "react-router-dom";
import { isLogin } from "../utils/isLogin";

function PublicRoute({ children }) {
  return isLogin ? <Navigate to="/home" /> : children;
}

export default PublicRoute;
