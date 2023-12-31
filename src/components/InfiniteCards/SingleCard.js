import { motion } from "framer-motion";
import "./infinite.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { APP_CONSTS } from "../../enums/enums";

const SingleCard = ({ card, style, onDirectionLock, onDragEnd, animate }) => {
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
          image={card.img ? card.img : `${APP_CONSTS.RANDOM_IMAGE}1`}
          alt="swiper-image"
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
export default SingleCard;
