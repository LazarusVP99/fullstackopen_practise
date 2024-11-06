import axios from "axios";

const getData = () => {
    const response = axios.get("http://localhost:3000/persons");
    return response.then(response => response.data).catch(error => {
        throw new Error(error.response.data.error || 'Failed to fetch data');
    });
};

const postData = ({ newName, newNumber }) => {
    const response = axios
        .post("http://localhost:3000/persons", {
            name: newName,
            number: newNumber,
        });
    return response.then((response) => response.data).catch(error => {
        throw new Error(error.response.data.error || 'Failed to add person');
    });
};

const deleteData = (id) => {
    const response = axios
        .delete(`http://localhost:3000/persons/${id}`);
    return response.then((response) => response.data).catch(error => {
        throw new Error(error.response.data.error || 'Failed to delete person');
    });
};

const updatePhoneNumber = (person) => {
    const response = axios.put(
        `http://localhost:3000/persons/${person.id}`, person);

    return response.then((response) => response.data).catch(error => {
        throw new Error(error.response.data.error || 'Failed to update number');
    });
};

export default {
    getData, postData, deleteData, updatePhoneNumber
};
