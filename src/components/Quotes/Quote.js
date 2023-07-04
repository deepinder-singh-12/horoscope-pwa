import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Quote = (props) => {
  const img = `https://source.unsplash.com/random?wallpapers&${props.index}`;
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
