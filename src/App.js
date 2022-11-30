import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Auth from "./pages/Auth";
import Copyright from "./components/Copyright";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const App = () => {
  const _authUrl =
    "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-ffa1eb7dfe8ca1260f9d27ba33051536d23c76cd1ab09f489cb233c7e8e5e065&redirect_uri=http%3A%2F%2F10.19.220.34%3A3000&response_type=code";
  return (
    <ThemeProvider theme={theme}>
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
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
