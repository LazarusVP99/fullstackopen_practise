import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { initAnecdotes } from "./data/anecdotes";

import About from "./components/About";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateAnecdote";
import Footer from "./components/Footer";
import Menu from "./components/menu";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initAnecdotes);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setNotification(""), 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  if (!anecdotes) return <div>no anecdotes...</div>;

  return (
    <div>
      <Notification message={notification} />
      <h1>Software anecdotes</h1>

      <Menu />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="about" element={<About />} />
        <Route
          path="create"
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route
          path="anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
