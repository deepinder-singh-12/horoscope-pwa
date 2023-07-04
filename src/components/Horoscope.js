import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { zodiac_sign } from "../helper/zodiacsigns";
import { splitDate } from "../helper/date-split";

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

const Horoscope = (props) => {
  const splittedDate = splitDate(props.userData.dob);
  const month = monthNames[+splittedDate[1] - 1].toLowerCase();
  const day = +splittedDate[2];

  const sign = zodiac_sign(day, month);

  return (
    <Card sx={{ maxWidth: 300, textAlign: "center", my: 1 }}>
      <CardMedia
        component="img"
        sx={{
          maxHeight: {
            xs: 180,
            md: 200,
          },
        }}
        image={`https://images.ganeshaspeaks.com/gsv8/zodiac-signs/ic-${sign.toLowerCase()}-color.webp`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Your Zodiac Sign is {sign}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can check your Horoscope{" "}
          <Button
            href={`https://www.ganeshaspeaks.com/horoscopes/daily-horoscope/${sign.toLowerCase()}/`}
          >
            Here
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Horoscope;
