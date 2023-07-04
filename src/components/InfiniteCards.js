import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import "./infinite.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const colors = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];
const randomColor = (current) => {
  while (true) {
    const index = Math.floor(Math.random() * colors.length);
    if (current != colors[index]) {
      return colors[index];
    }
  }
};

// Function to generate random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const getRandomItems = (allItems) => {
  const items = [];
  const max = allItems.length - 1;
  for (let i = 0; i < 10; i++) {
    const randomIndex = randomNumber(0, max);
    const element = allItems[randomIndex];
    items.push(element);
  }
  return items;
};

const Quote = ({
  card,
  style,
  onDirectionLock,
  onDragStart,
  onDragEnd,
  animate,
}) => {
  return (
    <motion.div
      className="card"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragDirectionLock
      onDirectionLock={onDirectionLock}
      onDragEnd={onDragEnd}
      animate={animate}
      style={{ ...style, background: card.background }}
      transition={{ ease: [0.6, 0.05, -0.01, 0.9] }}
      whileTap={{ scale: 0.85 }}
    >
      <Card
        sx={{ maxWidth: "100%", textAlign: "center", my: 2, maxHeight: "100%" }}
      >
        <CardMedia
          component="img"
          sx={{ maxHeight: 200 }}
          image={
            card.img
              ? card.img
              : `https://source.unsplash.com/random?wallpapers`
          }
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {card?.text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card?.author}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const InfiniteCards = () => {
  const [quotes, setQuotes] = useState([]);
  const [cards, setCards] = useState([
    { text: "Swipe me To get random quotes!", background: colors[2] },
  ]);

  useEffect(() => {
    const url = "https://type.fit/api/quotes";
    axios
      .get(url)
      .then((response) => {
        let randomQuotes = getRandomItems(response.data);
        randomQuotes = randomQuotes.map((quote, index) => {
          return {
            author: quote.author,
            text: quote.text,
            background: randomColor(cards[0].background),
            img: `https://source.unsplash.com/random?wallpapers&${index}`,
          };
        });
        setQuotes(randomQuotes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [dragStart, setDragStart] = useState({
    axis: null,
    animation: { x: 0, y: 0 },
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useTransform(
    dragStart.axis === "x" ? x : y,
    [-175, 175],
    [0.5, 0.25]
  );
  const shadowBlur = useTransform(
    dragStart.axis === "x" ? x : y,
    [-175, 175],
    [0, 25]
  );
  const shadowOpacity = useTransform(
    dragStart.axis === "x" ? x : y,
    [-175, 0, 175],
    [0, 0.2, 0]
  );
  const boxShadow = useMotionTemplate`0 ${shadowBlur}px 25px -5px rgba(0, 0, 0, ${shadowOpacity})`;
  const onDirectionLock = (axis) => setDragStart({ ...dragStart, axis: axis });
  const animateCardSwipe = (animation) => {
    setDragStart({ ...dragStart, animation });

    setTimeout(() => {
      setDragStart({ axis: null, animation: { x: 0, y: 0 } });
      x.set(0);
      y.set(0);
      const lastQuote = quotes.pop();
      setQuotes([lastQuote, ...quotes]);

      setCards([
        {
          ...quotes[0],
        },
        {
          ...quotes[1],
        },
        {
          ...quotes[2],
        },
      ]);
    }, 200);
  };
  const onDragEnd = (info) => {
    if (dragStart.axis === "x") {
      if (info.offset.x >= 100) animateCardSwipe({ x: 75, y: 0 });
      else if (info.offset.x <= -100) animateCardSwipe({ x: -75, y: 0 });
    } else {
      if (info.offset.y >= 100) animateCardSwipe({ x: 0, y: 75 });
      else if (info.offset.y <= -100) animateCardSwipe({ x: 0, y: -75 });
    }
  };
  const renderCards = () => {
    return cards.map((card, index) => {
      if (index === cards.length - 1) {
        return (
          <Quote
            card={card}
            key={index}
            style={{ x, y, zIndex: index }}
            onDirectionLock={(axis) => onDirectionLock(axis)}
            onDragEnd={(e, info) => onDragEnd(info)}
            animate={dragStart.animation}
          />
        );
      } else
        return (
          <Quote
            card={card}
            key={index}
            style={{
              scale,
              boxShadow,
              zIndex: index,
            }}
          />
        );
    });
  };
  return <div className="infinite-cards">{renderCards()}</div>;
};
