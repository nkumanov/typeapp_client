import axios from "axios";
import { checkLog } from "../../features/userLogin";

export async function addBookmark(blogId: string) {
  const response = await axios.patch(
    `http://localhost:5000/user/bookmark/${blogId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": checkLog(),
      },
    }
  );
  return response.data;
}
