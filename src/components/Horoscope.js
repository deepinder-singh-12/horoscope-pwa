import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { zodiac_sign } from "../helper/zodiacsigns";
import { splitDate } from "../helper/date-split";
import { APP_CONSTS } from "../enums/enums";
import { monthNames } from "../helper/month";

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
        image={`${APP_CONSTS.HOROSCOPE_IMAGE}${sign.toLowerCase()}-color.webp`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Your Zodiac Sign is {sign}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can check your Horoscope{" "}
          <Button href={`${APP_CONSTS.HOROSCOPE}${sign.toLowerCase()}/`}>
            Here
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Horoscope;
