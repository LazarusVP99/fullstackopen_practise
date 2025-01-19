import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnecdotesAction } from "./actions/api.action";
import NewAnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import DisplayAnecdote from "./components/MostVotedAnecdote";
import Notification from "./components/Notification";
import {
  clearMessage,
  messageText,
  notificationSelector,
} from "./reducers/notificationReducer";
import { selectFilteredAnecdotes } from "./selectors/anecdoteSelector";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(selectFilteredAnecdotes);
  const messageSelector = useSelector(notificationSelector);
  const notification = useCallback(
    (message, seconds) => dispatch(messageText({ message, seconds })),
    [dispatch]
  );

  useEffect(() => void dispatch(getAnecdotesAction(notification)), [dispatch, notification]);

  useEffect(() => {
    if (messageSelector) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, messageSelector.seconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [messageSelector, dispatch]);

  return (
    <div className="app_container">
      <div className="app_content">
        <Filter />
        <div className="anecdote_list">
          <h1>Anecdotes</h1>
          {anecdotes.length > 0 &&
            anecdotes.map((anecdote) => (
              <AnecdoteList
                key={anecdote.id}
                anecdote={anecdote}
                dispatch={dispatch}
                notification={notification}
              />
            ))}
        </div>
      </div>
      <div className="anecdote_container">
        <NewAnecdoteForm anecdotes={anecdotes} notification={notification} />
        <div className="most_voted_container">
          <h1>Anecdote with most votes</h1>
          {anecdotes.length > 0 && <DisplayAnecdote anecdotes={anecdotes} />}
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default App;
