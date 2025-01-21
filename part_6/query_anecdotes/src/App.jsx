import { useQuery } from "@tanstack/react-query";
import service from "./service";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import VoteAnecdote from "./Components/VoteAnecdote";

const App = () => {
  const { data: anecdotes, isError } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: service.getAnecdotes,
    retry: 1,
    refetchInterval: 10000,
  });

  if (isError)
    return <div>anecdote service not available due to problems in server</div>;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes && anecdotes.length > 0 ? (
        anecdotes.map((anecdote) => (
          <div key={anecdote.id} className="vote_anecdote_wrapper">
            <VoteAnecdote anecdote={anecdote} />
          </div>
        ))
      ) : (
        <div>no anecdotes</div>
      )}
    </div>
  );
};
export default App;
