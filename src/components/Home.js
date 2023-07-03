import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Horoscope from "./Horoscope";
import ZodiacForm from "./ZodiacForm";
import Quotes from "./Quotes/Quotes";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Home() {
  const [userData, setUserData] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("full_name");
    const dob = data.get("dob");

    if (name.trim().length > 0 && dob) {
      setUserData({
        name: name,
        dob: dob,
      });
    } else {
      alert("Please Enter Valid Name and Date");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/home.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {!userData && (
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <SentimentSatisfiedAltIcon />
              </Avatar>
            )}
            <Typography component="h1" variant="h5">
              Welcome {userData?.name}
            </Typography>

            {userData ? (
              <Horoscope userData={userData} />
            ) : (
              <ZodiacForm onDataSubmit={handleSubmit} />
            )}
          </Box>
          {userData && <Quotes />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
