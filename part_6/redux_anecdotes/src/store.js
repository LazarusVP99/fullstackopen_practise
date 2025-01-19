import { combineReducers, configureStore } from "@reduxjs/toolkit";
import anecdoteSlice from "./reducers/anecdoteReducer";
import filterSlice from "./reducers/filterReducer";
import notificationSlice from "./reducers/notificationReducer";

const reducer = combineReducers({
  anecdotes: anecdoteSlice,
  filter: filterSlice,
  notification: notificationSlice,
});

const store = configureStore({ reducer });

export default store;