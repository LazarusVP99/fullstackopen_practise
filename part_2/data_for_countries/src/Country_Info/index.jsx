import functions from "../functions";

const CountryInfo = ({ search, weather }) =>
  search.countries.map(({ name, capital, area, languages, flags }) => (
    <div key={name.common} className="country-list-wrapper">
      <h2>{name.common}</h2>
      <p>Capital: {capital}</p>
      <p>
        Area: {area} km<sup>2</sup>
      </p>
      <p className="languages-list">Languages:</p>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={`Flag of ${name.common}`} />
      <h3>
        Weather in {capital} in{" "}
        {new Date(weather?.hourly.time[0]).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h3>
      <img
        src={functions.imageCodeToDisplay(weather?.hourly.weathercode[0])}
        alt="weatherPicture"
      />
      <p>
        temperature: {weather?.hourly.temperature_2m[0]}{" "}
        {weather?.hourly_units.temperature_2m}
      </p>
      <p>
        wind: {weather?.hourly.wind_speed_10m[0]}{" "}
        {weather?.hourly_units.wind_speed_10m}
      </p>
      <p>
        wind direction:{" "}
        {functions.getWindDirection(weather?.hourly.wind_direction_120m[0])}{" "}
      </p>
      <p>
        humidity: {weather?.hourly.relative_humidity_2m[0]}{" "}
        {weather?.hourly_units.relative_humidity_2m}
      </p>
    </div>
  ));

export default CountryInfo;
