import axios from "axios";

const isInDevMode = import.meta.env.MODE === 'development';

const fetchUrl = !isInDevMode ?
    import.meta.env.VITE_SERVER_URL : "http://localhost:3001/api/persons";

const getData = () => axios.get(fetchUrl).then(response => response.data);

const postData = ({ newName, newNumber }) => axios
    .post(fetchUrl, {
        name: newName,
        number: newNumber,
    }).then((response) => response.data)

const deleteData = (id) => axios
    .delete(`${fetchUrl}/${id}`).then((response) => response.data)

const updatePhoneNumber = (person) => axios.put(
    `${fetchUrl}/${person.id}`, person).then((response) => response.data)

export default {
    getData, postData, deleteData, updatePhoneNumber
};
