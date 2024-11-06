import { PropTypes } from "prop-types";

const PersonForm = ({
  submitPerson,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  return (
    <form onSubmit={submitPerson}>
      <div style={{ margin: 10 }}>
        name:{" "}
        <input
          type="text"
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>
      <div style={{ margin: 10 }}>
        number:{" "}
        <input
          type="text"
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  submitPerson: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  setNewName: PropTypes.func.isRequired,
  setNewNumber: PropTypes.func.isRequired,
};

export default PersonForm;
