import { useDispatch, useSelector } from "react-redux";
import NewAnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import DisplayAnecdote from "./components/MostVotedAnecdote";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    [...state.anecdotes].sort(({ votes: a }, { votes: b }) => b - a)
  );

  return (
    <div className="app_container">
      <div className="app_content">
        <h1>Anecdotes</h1>
        {anecdotes.length > 0 &&
          anecdotes.map((anecdote) => (
            <AnecdoteList
              key={anecdote.id}
              anecdote={anecdote}
              dispatch={dispatch}
            />
          ))}
      </div>
      <div className="anecdote_container">
        <NewAnecdoteForm anecdotes={anecdotes} />
        <div className="most_voted_container">
          <h1>Anecdote with most votes</h1>
          {anecdotes.length > 0 && <DisplayAnecdote anecdotes={anecdotes} />}
        </div>
      </div>
    </div>
  );
};

export default App;
