import axios from "axios";
import { api } from "../../constants/api";
export const getBlogs = async () => {
  try {
    const response = await axios.get(api.getAllBlogs);
    return response;
  } catch (error) {}
};
