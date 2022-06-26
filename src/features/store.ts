import { configureStore } from "@reduxjs/toolkit"
import userLoginReducer from './userLogin'
const store = configureStore({
    reducer: {
      user: userLoginReducer
    },
  })
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  export default store