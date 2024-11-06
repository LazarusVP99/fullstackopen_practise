const Persons = ({ persons, deletePerson }) =>
  persons?.map(({ id, name, number }) => (
    <div key={id} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <p style={{ margin: "10px" }}>
        {name} {number}
      </p>
      <button
        onClick={() => deletePerson(id, name)}
        style={{ height: "20px", background: "#f44336" }}
        type="button"
      >
        delete
      </button>
    </div>
  ));

export default Persons;
