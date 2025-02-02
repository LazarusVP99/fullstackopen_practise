import { useMatch } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const match = useMatch("/anecdotes/:id");

  const anecdote = match
    ? anecdotes.find(({ id }) => id === +match.params.id)
    : null;

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

export default Anecdote;
