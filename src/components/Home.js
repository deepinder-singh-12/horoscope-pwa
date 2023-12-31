import React, { useState } from "react";
import {
  Switch,
  Stack,
  Avatar,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Horoscope from "./Horoscope";
import ZodiacForm from "./ZodiacForm";
import Quotes from "./Quotes/Quotes";
import InfiniteCards from "./InfiniteCards/InfiniteCards";
import { APP_CONSTS } from "../enums/enums";

const defaultTheme = createTheme();

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [swiperChecked, setSwiperChecked] = useState(false);
  const handleSwiperChecked = () => setSwiperChecked((prevState) => !prevState);
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
      alert(APP_CONSTS.ALERT);
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
            {userData && (
              <>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>List Quotes</Typography>
                  <Switch
                    checked={swiperChecked}
                    onChange={handleSwiperChecked}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography>Swipe Quotes</Typography>
                </Stack>
                <>{swiperChecked ? <InfiniteCards /> : <Quotes />}</>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
