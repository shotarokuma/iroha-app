import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const Loading: React.FC = () => {
  return (
    <Box
      sx={{ width: "50%" }}
      style={{
        position: "absolute",
        top: "50%",
        left: "25%",
      }}
    >
      <Typography component="h2" variant="h5" textAlign="center">
        Loading...
      </Typography>
      <LinearProgress />
    </Box>
  );
};

export default Loading;
