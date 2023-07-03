import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Horoscope
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const ZodiacForm = (props) => {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={props.onDataSubmit}
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="full_name"
        label="Full Name"
        type="text"
        name="full_name"
        autoFocus
      />
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        required
        fullWidth
        name="dob"
        label="D.O.B"
        type="date"
        id="dob"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Get Zodiac Sign
      </Button>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
};

export default ZodiacForm;
