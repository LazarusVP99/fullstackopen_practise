import { useField, useResource } from "../hooks";

const baseUrl = "http://localhost:3005";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource(`${baseUrl}/notes`);
  const [persons, personService] = useResource(`${baseUrl}/persons`);

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>

      {notes.map(({ id, content }) => (
        <p key={id}>{content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>

      {persons.map(({ id, name, number }) => (
        <p key={id}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default App;
