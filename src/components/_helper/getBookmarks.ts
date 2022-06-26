import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkLog } from "../../features/userLogin";
export const getBookmarks = createAsyncThunk("blogs/getBlogs", async () => {
  try {
    const response = await axios
      .get("http://localhost:5000/user/bookmarked", {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": checkLog(),
        },
      })
      .then((res) => res);
    let data = await response.data;
    if (response.data.length === 0) {
      return [];
    }
    return [...data];
  } catch (error) {
    console.log(error);
  }
});
