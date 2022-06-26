import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { getBookmarks } from "../components/_helper/getBookmarks";

export const checkLog = (): string => {
  const cookie = new Cookies();
  if (cookie.get("userData")) {
    return cookie.get("userData");
  } else {
    return "";
  }
};
const setUserCookie = (token: string): void => {
  const cookie = new Cookies();
  cookie.set("userData", token);
};
const logUserOut = (): void => {
  const cookie = new Cookies();
  cookie.remove("userData");
};


interface Initial {
  userLogin: string;
  bookmarked: any[];
  status: string;
}
const initialState: Initial = {
  userLogin: checkLog(),
  bookmarked: [],
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: Initial, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
      console.log(action.payload)
      setUserCookie(action.payload);
    },
    logout: (state: Initial, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
      logUserOut();
    },
    register: (state: Initial, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
      setUserCookie(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getBookmarks.fulfilled, (state, action) => {
      if (action.payload) {
        state.bookmarked = action.payload;
      }
    });
    builder.addCase(getBookmarks.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const { login, logout, register } = userSlice.actions;

export default userSlice.reducer;
