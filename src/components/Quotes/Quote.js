import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { APP_CONSTS } from "../../enums/enums";

const Quote = (props) => {
  const img = `${APP_CONSTS.RANDOM_IMAGE}${props.index}`;
  return (
    <Card sx={{ maxWidth: "100%", textAlign: "center", my: 2 }}>
      <CardMedia
        component="img"
        sx={{ maxHeight: 400 }}
        image={img}
        alt="image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props?.text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props?.author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Quote;
