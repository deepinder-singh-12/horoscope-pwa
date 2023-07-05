import { axiosCreate } from "./axiosCreate";

// GET request method of axios
export const get = async (path) => {
  return axiosCreate
    .get(path)
    .then((response) => response)
    .catch((error) => error);
};
