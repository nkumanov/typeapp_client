import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: false },
  reducers: {
    login: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    logout: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
