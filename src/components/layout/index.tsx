import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./footer";
import TopBar from "./top-bar";

const theme = createTheme();

function Layout({ children }: { children?: any }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
