const DisplayAnecdote = ({ anecdotes }) => {
  // Get the index of anecdote with most votes
  const maxVotesIndex = anecdotes.reduce(
    (maxIndex, current, index, arr) =>
      current.votes > arr[maxIndex].votes ? index : maxIndex,
    0
  );
  return (
    <div className="most_voted_anecdote">
      {anecdotes[maxVotesIndex].content} <br /> has{" "}
      {anecdotes[maxVotesIndex].votes} votes
    </div>
  );
};

export default DisplayAnecdote;
