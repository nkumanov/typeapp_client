import axios from "axios";
import { api } from "../../constants/api";

export const getBlogById = async (id: string) => {
  const response = await axios(`${api.getBlogById}/${id}`);
  return response;
};
