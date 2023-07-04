import React, { useState, useEffect } from "react";
import { useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import SingleCard from "./SingleCard";
import { getRandomItems, randomColor } from "../../helper/randomHelper";
import { colors } from "../../helper/colors";
import { axiosRequest } from "../../api/axiosRequest";
import { Box, CircularProgress } from "@mui/material";

const InfiniteCards = () => {
  const [dragStart, setDragStart] = useState({
    axis: null,
    animation: { x: 0, y: 0 },
  });
  const [quotes, setQuotes] = useState([]);
  const [cards, setCards] = useState([
    { text: "Swipe me To get random quotes!", background: colors[2] },
  ]);

  useEffect(() => {
    axiosRequest
      .get("/quotes")
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

      setCards(quotes.slice(0, 3));
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
          <SingleCard
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
          <SingleCard
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
  return (
    <>
      {quotes.length > 0 ? (
        <div className="infinite-cards">{renderCards()}</div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
export default InfiniteCards;
