import React, { useEffect, useState } from "react";
import Quote from "./Quote";
import { getRandomItems } from "../../helper/randomHelper";
import { Box, Container, CircularProgress } from "@mui/material";
import { getQuotes } from "../../services/quotes";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getQuotes();
      const randomQuotes = getRandomItems(response.data);
      setQuotes(randomQuotes);
    })();
  }, []);
  return (
    <>
      {quotes.length > 0 ? (
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
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Quotes;
