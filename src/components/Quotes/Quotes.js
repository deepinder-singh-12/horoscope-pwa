import React, { useEffect, useState } from "react";
import Quote from "./Quote";
import { getRandomItems } from "../../helper/randomHelper";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosRequest } from "../../api/axiosRequest";

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
