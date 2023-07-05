import { get } from "../api/axiosRequest";

export const getQuotes = () => {
  return get("/quotes");
};
