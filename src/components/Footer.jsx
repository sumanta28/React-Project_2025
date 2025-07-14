// src/components/Footer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box mt={4} py={2} textAlign="center" bgcolor="#f5f5f5">
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} GitHub Profile Viewer | Made by Sumanta
      </Typography>
    </Box>
  );
};

export default Footer;
