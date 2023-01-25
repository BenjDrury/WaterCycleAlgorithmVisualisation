import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function TopBar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Box
          component="img"
          sx={{
            maxHeight: 50,
            border: 2,
            my: 2,
            borderRadius: "50%",
          }}
          alt="Benjamin Jeremy Drury"
          src={process.env.PUBLIC_URL + "/assets/benjamin-drury.jpg"}
        />
        <Typography variant="h6" color="inherit" noWrap sx={{ ml: 2 }}>
          Water Cycyle Algorithm by Benjamin Jeremy Drury
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
