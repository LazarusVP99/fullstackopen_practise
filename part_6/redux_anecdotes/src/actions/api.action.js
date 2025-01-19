import { createAnecdote, setAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer";
import service from "../service/fetch.service";

const { getAnecdotes, updateVote } = service;

export const getAnecdotesAction = notification => async (dispatch) => {
    try {
        const anecdotes = await getAnecdotes();
        dispatch(setAnecdotes(anecdotes));
    } catch (error) {
        notification(`Error: ${error.message}`, 7);
    }
};

export const createAnecdoteAction = (anecdote, notification) => async (dispatch) => {
    try {
        const newAnecdote = await service
            .createAnecdote(anecdote);
        dispatch(createAnecdote(newAnecdote));
        notification(`You created a new anecdote`, 5);
        return newAnecdote;
    } catch (error) {
        notification(`Something went wrong ${error}`, 7);
    }
};

export const updateVoteAction = (anecdote, notification) => async (dispatch) => {
    try {
        const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };

        const updatedAnecdote = await updateVote(anecdote.id, anecdoteToUpdate);

        dispatch(voteAnecdote(updatedAnecdote.id));
        notification(`You voted for ${anecdote.content.slice(0, 30)}...`, 5);
    } catch (error) {
        notification(`Something went wrong ${error}`, 7);
    }
};
