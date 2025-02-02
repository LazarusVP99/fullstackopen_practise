import { useEffect, useState } from "react";

export const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type, value, onChange,
    };
};

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => void (async () => {
        try {
            if (!name) return;

            const response = await fetch(
                `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
            );
            const data = await response.json();

            setCountry({ found: data.error !== 'not found', data });
        } catch (error) {
            setCountry({ found: false, data: null });
        }
    })(), [name]);

    return country;
};
