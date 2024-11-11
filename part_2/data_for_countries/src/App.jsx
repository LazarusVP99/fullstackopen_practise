import axios from "axios";
import { useEffect, useState } from "react";

import Countries from "./Countries/countries.jsx";
import CountryInfo from "./Country_Info/index.jsx";
import CountrySearch from "./Search_Field/search";

import functions from "./functions.js";

const fetchCountries = "https://studies.cs.helsinki.fi/restcountries/api";
const fetchWeather = "https://api.open-meteo.com/v1/forecast";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState({
    countries,
    infoMessage: "",
  });
  const [searchValue, setSearchValue] = useState("");

  const { searchConditions } = functions;

  useEffect(() => {
    axios
      .get(`${fetchCountries}/all`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchValue]);

  const weatherParams = {
    latitude: search.countries?.map(({ latlng }) => latlng[0])[0],
    longitude: search.countries?.map(({ latlng }) => latlng[1])[0],
  };

  useEffect(() => {
    if (weatherParams.latitude && weatherParams.longitude) {
      axios
        .get(
          `${fetchWeather}?latitude=${weatherParams.latitude || 0}&longitude=${
            weatherParams.longitude || 0
          }&t=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_120m,weathercode`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [weatherParams.latitude, weatherParams.longitude]);

  useEffect(() => {
    const searchEffect = () => {
      if (countries) {
        const filteredCountries = countries.filter(({ name }) =>
          name.common
            .toLowerCase()
            .replace(/ /g, "")
            .includes(searchValue.toLowerCase().trim().replace(/ /g, ""))
        );

        setSearch(
          searchConditions(filteredCountries, countries)[
            filteredCountries.length > 10
              ? "many"
              : filteredCountries.length === 0
              ? "0"
              : "default"
          ]
        );

        if (searchValue.trim() === "") {
          setSearch({
            countries,
            infoMessage: "Type to search for a country",
          });
        }
      }
    };

    searchEffect();
  }, [countries, searchConditions, searchValue]);

  const handleOnCountryClick = (countryName) =>
    axios
      .get(`${fetchCountries}/name/${countryName}`)
      .then((response) => {
        setSearch({
          countries: [response.data],
          infoMessage: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });

  if (!search.countries || !weather) {
    return <div id="loading">Loading...</div>;
  }

  return (
    <>
      <CountrySearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {search.infoMessage === "" ? (
        search.countries.length > 1 ? (
          <Countries
            search={search}
            handleOnCountryClick={handleOnCountryClick}
          />
        ) : (
          <CountryInfo search={search} weather={weather} />
        )
      ) : (
        <div>{search.infoMessage}</div>
      )}
    </>
  );
};

export default App;
