import { createSlice } from "@reduxjs/toolkit";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload;

      const anecdoteToChange = state.find(n => n.id === id);

      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    createAnecdote: (state, action) => [...state, action.payload],
    setAnecdotes: (__, action) => action.payload,
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;
