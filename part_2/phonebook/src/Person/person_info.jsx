const Persons = ({ persons, deletePerson }) =>
  persons?.map(({ id, name, number }) => (
    <div key={id} className="persons_container">
      <p>
        <span>{name}</span>
        <span>{number}</span>
      </p>
      <button type="button" onClick={() => deletePerson(id, name)}>
        delete
      </button>
    </div>
  ));

export default Persons;
