import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdoteForm = ({ anecdotes }) => {
  const dispatch = useDispatch();

  const createAnecdoteHandler = (e) => {
    e.preventDefault();

    const { value } = e.target.anecdote;
    const isUniqueAnecdote = anecdotes.some(
      ({ content }) =>
        content.toLowerCase().replace(/[^a-zA-Z0-9]/g, "") ===
        value.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
    );

    if (!value.trim() || isUniqueAnecdote) return;

    dispatch(createAnecdote(value));

    e.target.anecdote.value = "";
  };

  return (
    <div className="form_container">
      <h2>Create new anecdote</h2>
      <form onSubmit={createAnecdoteHandler}>
        <div>
          <input
            type="text"
            name="anecdote"
            placeholder="write anecdote here"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewAnecdoteForm;
