import { useDispatch } from "react-redux";

import { createAnecdoteAction } from "../actions/api.action";

const NewAnecdoteForm = ({ anecdotes, notification }) => {
  const dispatch = useDispatch();

  const createAnecdoteHandler = async (e) => {
    e.preventDefault();

    const { value } = e.target.anecdote;
    const isUniqueAnecdote = anecdotes.some(
      ({ content }) =>
        content.toLowerCase().replace(/[^a-zA-Z0-9]/g, "") ===
        value.toLowerCase().replace(/[^a-zA-Z0-9]/g, "")
    );

    if (!value.trim() || isUniqueAnecdote) {
      notification(`Anecdote must be unique and not empty`, 7);
      return;
    }
    dispatch(createAnecdoteAction({ content: value, votes: 0 }, notification));

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
