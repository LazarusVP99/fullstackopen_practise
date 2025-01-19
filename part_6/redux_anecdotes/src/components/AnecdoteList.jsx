import { updateVoteAction } from "../actions/api.action";

const AnecdoteList = ({ anecdote, dispatch, notification }) => (
  <>
    <div>
      {anecdote.content} <br />
      has {anecdote.votes} votes
    </div>
    <div className="button_container">
      <button
        onClick={() => dispatch(updateVoteAction(anecdote, notification))}
      >
        vote
      </button>
    </div>
  </>
);

export default AnecdoteList;
