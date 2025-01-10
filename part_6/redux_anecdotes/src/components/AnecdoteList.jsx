import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = ({ anecdote, dispatch }) => (
  <>
    <div>
      {anecdote.content} <br />
      has {anecdote.votes} votes
    </div>
    <div className="button_container">
      <button
        onClick={() => dispatch(voteAnecdote(anecdote.id))}
      >
        vote
      </button>
    </div>
  </>
);

export default AnecdoteList;
