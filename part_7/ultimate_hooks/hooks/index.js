import axios from "axios";
import { useEffect, useState } from "react";

export const useField = type => {
    const [value, setValue] = useState("");

    const onChange = ({ target }) => setValue(target.value);

    return { type, value, onChange };
};

export const useResource = baseUrl => {
    const [resources, setResources] = useState([]);

    useEffect(() => void (async () => {
        try {
            const response = await axios.get(baseUrl);
            setResources(response.data);
        } catch (error) {
            console.error('Error fetching resources:', error);
            setResources([]);
        }
    })(), [baseUrl]);

    const create = async (resource) => {
        try {
            const response = await axios.post(baseUrl, resource);
            setResources([...resources, response.data]);
            return response.data;
        } catch (error) {
            console.error('Error creating resource:', error);
        }
    };

    const service = { create };
    return [resources, service];
};

