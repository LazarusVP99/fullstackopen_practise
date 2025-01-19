import { createSelector } from "@reduxjs/toolkit";

const selectAnecdotes = state => state.anecdotes;
const selectFilter = state => state.filter.filter;
const processFilter = (filter) => filter.toLowerCase().replaceAll(" ", "");

export const selectFilteredAnecdotes = createSelector(
    [selectAnecdotes, selectFilter],
    (anecdotes, filter) => [...anecdotes]
        .sort(({ votes: a }, { votes: b }) => b - a)
        .filter(({ content }) =>
            processFilter(content).includes(processFilter(filter))
        ));
