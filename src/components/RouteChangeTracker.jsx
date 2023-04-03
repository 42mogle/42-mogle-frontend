import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const RouteChangeTracker = () => {
  const location = useLocation();

  // Google Analytics 초기화
  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
    }
  }, []);

  // 페이지 뷰 추적
  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);

  return null;
};

export default RouteChangeTracker;
