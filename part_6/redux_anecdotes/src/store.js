import { configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "./reducers/anecdoteReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
  },
});

export default store;