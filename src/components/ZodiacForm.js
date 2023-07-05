import React from "react";
import { Button, Box, TextField } from "@mui/material";
import Copyright from "./Copyright";

const ZodiacForm = (props) => {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={props.onDataSubmit}
      sx={{ m: 2 }}
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
