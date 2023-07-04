import React, { useEffect, useState } from "react";
import Quote from "./Quote";
import { getRandomItems } from "../../helper/randomHelper";
import { Container } from "@mui/material";
import { axiosRequest } from "../../api/api";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    axiosRequest
      .get("/quotes")
      .then((response) => {
        const randomQuotes = getRandomItems(response.data);
        setQuotes(randomQuotes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Container
      sx={{
        maxHeight: 700,
        maxWidth: 500,
        overflowY: "scroll",
      }}
    >
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
