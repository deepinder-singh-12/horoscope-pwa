import { colors } from "./colors";

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomItems = (allItems) => {
  const items = [];
  const max = allItems.length - 1;
  for (let i = 0; i < 10; i++) {
    const randomIndex = randomNumber(0, max);
    const element = allItems[randomIndex];
    items.push(element);
  }
  return items;
};

export const randomColor = (current) => {
  while (true) {
    const index = Math.floor(Math.random() * colors.length);
    if (current !== colors[index]) {
      return colors[index];
    }
  }
};
