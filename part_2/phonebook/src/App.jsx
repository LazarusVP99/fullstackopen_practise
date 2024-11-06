import { useEffect, useState } from "react";

import Filter from "./Filter/filter";
import PersonForm from "./Person/person_form";
import Persons from "./Person/person_info";

import fetchData from "./fetch";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filterValue, setFilterValue] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState({
    error: "",
    success: "",
  });

  const { getData, postData, deleteData, updatePhoneNumber } = fetchData;

  const newMessage = (message, type) => {
    // Show message immediately
    setMessage({
      error: type === "error" ? message : "",
      success: type === "success" ? message : "",
    });

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ error: "", success: "" });
    }, 3000);
  };

  // Fetch persons data from server on component mount
  useEffect(() => {
    const getPersonsData = async () => {
      const personsData = await getData();
      setPersons(personsData);
    };

    getPersonsData();
  }, [getData]);

  // Update filtered persons whenever persons array changes
  useEffect(() => setFilteredPersons(persons), [persons]);

  // Handle form submission to add new person
  const submitPerson = async (event) => {
    event.preventDefault();
    const uniqueName = persons.find(({ name }) => name === newName);

    // Check if name already exists in the list
    if (
      uniqueName &&
      confirm(
        `${newName} is already added to phonebook,replace the old number with a new one?`
      )
    ) {
      try {
        // Update existing person's phone number
        const updatedPerson = {
          ...uniqueName,
          number: newNumber,
        };

        await updatePhoneNumber(updatedPerson);
        setPersons(
          persons.map((person) =>
            person.id === uniqueName.id ? updatedPerson : person
          )
        );
        newMessage(`Updated ${newName}'s phone number`, "success");
      } catch (error) {
        newMessage(error.message, "error");
      }
      return;
    }
    // Check if name or number is empty
    if (!newName || !newNumber) {
      newMessage("Please fill in all fields", "error");
      return;
    }

    try {
      const newPersons = [
        ...persons,
        {
          name: newName,
          number: newNumber,
        },
      ];
      /// Add new person to the list
      await postData({ newName, newNumber });

      // Filter updated list based on current search value
      const updatedFilterList = newPersons.filter(({ name }) =>
        name
          .toLowerCase()
          .replace(/ /g, "")
          .includes(filterValue.toLowerCase().replace(/ /g, "").trim())
      );

      // Update state with new data
      setPersons(newPersons);
      setFilteredPersons(updatedFilterList);
      newMessage(`Added ${newName}`, "success");

      setNewNumber("");
      setNewName("");
    } catch (error) {
      newMessage(error.message, "error");
    }
  };

  const handleSearch = ({ target }) => {
    const { value } = target;

    setFilterValue(value);

    // Filter persons based on search input
    const filteredNames = persons.filter(({ name }) =>
      name
        .toLowerCase()
        .replace(/ /g, "")
        .includes(value.toLowerCase().replace(/ /g, "").trim())
    );

    setFilteredPersons(filteredNames);
  };

  // Delete a person from the list
  const deletePerson = async (personId, name) => {
    try {
      if (!window.confirm(`Confirm deletion of ${name} ?`)) return;

      await deleteData(personId);
      const updatePersons = persons.filter(({ id }) => id !== personId);

      setPersons(updatePersons);
      setFilteredPersons(updatePersons);
      newMessage(`${name} was successfully deleted`, "success");
    } catch (error) {
      newMessage(error.message, "error");
    }
  };

  if (!persons) return <p>Loading...</p>;

  return (
    <div>
      <h2>Phonebook</h2>
      <div className={`message ${message.success ? "success" : "hidden"}`}>
        {message.success}
      </div>
      <div className={`message ${message.error ? "error" : "hidden"}`}>
        {message.error}
      </div>

      <Filter handleSearch={handleSearch} filterValue={filterValue} />

      <h2>Add a new</h2>

      <PersonForm
        submitPerson={submitPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
