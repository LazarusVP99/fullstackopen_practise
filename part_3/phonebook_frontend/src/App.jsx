import { useEffect, useState } from "react";

import Filter from "./Filter/filter";
import PersonForm from "./Person/person_form";
import Persons from "./Person/person_info";

import AlertMessage from "./Alert/alert";
import fetchData from "./service/fetch";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filterValue, setFilterValue] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState({
    error: "",
    success: "",
    styleType: "",
  });

  const { getData, postData, deleteData, updatePhoneNumber } = fetchData;

  const newMessage = (message, type) => {
    // Show message immediately
    setMessage({
      error: type === "error" ? message : "",
      success: type === "success" ? message : "",
      styleType: type,
    });

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ error: "", success: "", styleType: "" });
    }, 3000);
  };

  // Fetch persons data from server on component mount
  useEffect(() => {
    const getPersonsData = () =>
      getData()
        .then((response) => setPersons(response))
        .catch((error) =>
          newMessage(
            error.message || "Error can`t get data, try again later",
            "error"
          )
        );

    getPersonsData();
  }, [getData]);

  // Update filtered persons whenever persons array changes
  useEffect(() => setFilteredPersons(persons), [persons]);

  // Handle form submission to add new person
  const submitPerson = (event) => {
    event.preventDefault();
    const uniqueName = persons.find(
      ({ name }) => name.toLowerCase().trim() === newName.toLowerCase().trim()
    );

    // Check if name already exists in the list
    if (uniqueName) {
      const confirmUpdate = confirm(
        `${newName} is already added to phonebook,want to update the existing number with a new one?`
      );

      if (confirmUpdate) {
        // Update existing person's phone number if user confirm
        const updatedPerson = {
          ...uniqueName,
          number: newNumber,
        };

        updatePhoneNumber(updatedPerson)
          .then((response) => {
            setPersons(
              persons?.map((person) =>
                person.id === uniqueName.id ? response : person
              )
            );
            setNewNumber("");
            setNewName("");
            newMessage(`Updated ${newName}'s phone number`, "success");
          })
          .catch((error) => {
            newMessage(error.message || "Failed to Update Person", "error");
          });
      }
      return;
    }

    // Check if name or number is empty
    if (!newName || !newNumber) {
      newMessage("Please fill in all fields", "error");
      return;
    }

    /// Add new person to the list
    postData({ newName, newNumber })
      .then((response) => {
        const newPersons = [...persons, response];
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
      })
      .catch((error) => {
        newMessage(error.message || "Failed to add Person", "error");
      });
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
  const deletePerson = (personId, name) => {
    if (!window.confirm(`Confirm deletion of ${name} ?`)) return;

    deleteData(personId)
      .then(() => {
        const updatePersons = persons.filter(({ id }) => id !== personId);

        setPersons(updatePersons);
        setFilteredPersons(updatePersons);
        newMessage(`${name} was successfully deleted`, "success");
      })
      .catch((error) => {
        newMessage(error.message || "Failed to delete Person", "error");
      });
  };

  if (!persons) return <p>Loading...</p>;

  return (
    <div>
      <h2>Phonebook</h2>

      <AlertMessage message={message} />

      <Filter handleSearch={handleSearch} filterValue={filterValue} />

      <h2>Add a new</h2>

      <PersonForm
        submitPerson={submitPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers:</h2>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
