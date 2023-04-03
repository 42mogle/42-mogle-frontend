import { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

class RouteChangeTracker extends Component {
  componentDidMount() {
    this.initializeGA();
    this.trackPage();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      this.trackPage();
    }
  }

  initializeGA() {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
    }
  }

  trackPage() {
    const { location } = this.props;
    ReactGA.pageview(location.pathname + location.search);
  }

  render() {
    return null;
  }
}

export default withRouter(RouteChangeTracker);
