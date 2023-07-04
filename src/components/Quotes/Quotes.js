import React, { useEffect, useState } from "react";
import axios from "axios";
import Quote from "./Quote";
import { Container } from "@mui/material";
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

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const url = "https://type.fit/api/quotes";
    axios
      .get(url)
      .then((response) => {
        const randomQuotes = getRandomItems(response.data);
        setQuotes(randomQuotes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Container maxWidth={"500px"}>
      {quotes.map((quote, index) => (
        <Quote
          author={quote.author}
          text={quote.text}
          key={index}
          index={index}
        />
      ))}
    </Container>
  );
};

export default Quotes;
