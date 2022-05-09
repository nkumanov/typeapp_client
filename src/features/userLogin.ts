import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import React from "react";
import Cookies from 'universal-cookie'

const checkLog = (): string => {
  const cookie = new Cookies();
  if (cookie.get('userData')) {
    return cookie.get('userData')
  } else {
    return '';
  }
}
const logUserOut = (): void => {
  const cookie = new Cookies();
  cookie.remove('userData')
}

export const getBookmarks = createAsyncThunk('blogs/getBlogs', async () => {
  try {
    let response = await fetch('http://localhost:5000/user/bookmarked', {
      method: 'GET',
      headers: { "Content-Type": "application/json", 'X-Authorization': checkLog() },
    });
    let data = await response.json();
    return [...data];
  } catch (error) {
    console.log(error);
  }
})
interface Initial {
  value: string,
  posts: any[],
  status: string
}
const initialState: Initial = {
  value: checkLog(), posts: [], status: 'idle'
}
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    logout: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      logUserOut()
    },
  },
  extraReducers(builder) {
    builder.addCase(getBookmarks.fulfilled, (state, action) => {
      console.log(action.payload)
      
    })
  }
});

export const { login, logout } = userSlice.actions;


export default userSlice.reducer;
