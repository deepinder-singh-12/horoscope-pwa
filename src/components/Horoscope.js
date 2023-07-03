import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function splitDate(date) {
  let result = date.split("-");
  return result;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function zodiac_sign(day, month) {
  let astro_sign = "";

  // checks month and date within the
  // valid range of a specified zodiac
  if (month == "december") {
    if (day < 22) astro_sign = "Sagittarius";
    else astro_sign = "capricorn";
  } else if (month == "january") {
    if (day < 20) astro_sign = "Capricorn";
    else astro_sign = "aquarius";
  } else if (month == "february") {
    if (day < 19) astro_sign = "Aquarius";
    else astro_sign = "pisces";
  } else if (month == "march") {
    if (day < 21) astro_sign = "Pisces";
    else astro_sign = "aries";
  } else if (month == "april") {
    if (day < 20) astro_sign = "Aries";
    else astro_sign = "taurus";
  } else if (month == "may") {
    if (day < 21) astro_sign = "Taurus";
    else astro_sign = "gemini";
  } else if (month == "june") {
    if (day < 21) astro_sign = "Gemini";
    else astro_sign = "cancer";
  } else if (month == "july") {
    if (day < 23) astro_sign = "Cancer";
    else astro_sign = "leo";
  } else if (month == "august") {
    if (day < 23) astro_sign = "Leo";
    else astro_sign = "virgo";
  } else if (month == "september") {
    if (day < 23) astro_sign = "Virgo";
    else astro_sign = "libra";
  } else if (month == "october") {
    if (day < 23) astro_sign = "Libra";
    else astro_sign = "scorpio";
  } else if (month == "november") {
    if (day < 22) astro_sign = "scorpio";
    else astro_sign = "sagittarius";
  }

  return astro_sign;
}

const Horoscope = (props) => {
  let splittedDate = splitDate(props.userData.dob);
  let year = splittedDate[0];
  let month = monthNames[+splittedDate[1] - 1].toLowerCase();
  let day = +splittedDate[2];

  let sign = zodiac_sign(day, month);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://source.unsplash.com/random?wallpapers"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {sign}
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Horoscope;
