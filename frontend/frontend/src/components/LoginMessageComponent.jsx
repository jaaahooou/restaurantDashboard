import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const LoginMessageComponent = () => {
  return (
    <div>
      {" "}
      <Alert severity="error">You must be logged in!</Alert>
    </div>
  );
};
