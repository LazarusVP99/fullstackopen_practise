import axios from 'axios';

const baseUrl = `http://localhost:3001/anecdotes`;

const getAnecdotes = async () => (await axios.get(baseUrl)).data;

const createAnecdote = async blog => (await axios.post(baseUrl, blog)).data;

const updateVote = async (id, anecdote) =>
    (await axios.put(`${baseUrl}/${id}`, anecdote)).data;

export default {
    getAnecdotes,
    createAnecdote,
    updateVote,
};
