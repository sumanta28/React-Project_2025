// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "white", textDecoration: "none" }}>
          GitHub Profile Viewer
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {/* Add more buttons as needed */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
