import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="mailto:drury.benj@gmail.com" target="_blank">
        Benjamin Jeremy Drury
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Benjamin Jeremy Drury
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary">
        The WC-Algorithm Visualisation by Benjamin Jeremy Drury for his
        Bachelorthesis 2022.
      </Typography>
      <Copyright />
    </Box>
  );
}

export default Footer;
