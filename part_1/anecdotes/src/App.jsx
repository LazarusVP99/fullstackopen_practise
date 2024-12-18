import { useState } from "react";
import DisplayAnecdote from "./Display/anecdote";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [maxVotes, setMaxVotes] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  // function to generate random index
  const generateRandomIndex = () =>
    Math.floor(Math.random() * anecdotes.length);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]} <br /> has {votes[selected]} votes
      </div>
      <button
        onClick={() => {
          const voteCount = [...votes];
          voteCount[selected] += 1;
          setVotes(voteCount);
          // find the index of the anecdote with the most votes
          const maxVoteIndex = voteCount.indexOf(Math.max(...voteCount));
          setMaxVotes(maxVoteIndex);
        }}
      >
        vote
      </button>
      <button
        style={{ margin: "10px" }}
        onClick={() => setSelected(generateRandomIndex())}
      >
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote
        anecdotes={anecdotes}
        votes={votes}
        maxVotes={maxVotes}
      />
    </>
  );
};

export default App;
