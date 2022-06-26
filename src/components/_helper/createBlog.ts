import axios from "axios";
import { api } from "../../constants/api";
import { checkLog } from "../../features/userLogin";
import { CreateBlogDTO } from "../../models/CreateBlogDTO";

export const createBlog = async (data: CreateBlogDTO) => {
  const response = await axios.post(`${api.createBLog}`, data, {
    headers: {
      'X-Authorization': checkLog()
    }
  });
  return response;
};

