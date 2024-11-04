const DisplayAnecdote = ({ anecdotes, votes, maxVotes }) => (
  <div>
    {anecdotes[maxVotes]} <br /> has {votes[maxVotes]} votes
  </div>
);

export default DisplayAnecdote;
