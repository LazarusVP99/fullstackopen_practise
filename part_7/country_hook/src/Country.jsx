import { PropTypes } from "prop-types";

const Country = ({ country }) => {
  if (!country) return <div>Loading...</div>;
  if (!country.found || !country.data) {
    return <div>not found...</div>;
  }

  const { data, found } = country;

  return (
    <div>
      {found && (
        <div>
          <h3>{data.name.common} </h3>
          <div>capital {data.capital} </div>
          <div>population {data.population}</div>
          <img
            src={data.flags.png}
            height="100"
            alt={`flag of ${data.name.common}`}
          />
        </div>
      )}
    </div>
  );
};

export default Country;

Country.propTypes = {
  country: PropTypes.oneOfType([
    PropTypes.shape({
      found: PropTypes.bool,
      data: PropTypes.shape({
        name: PropTypes.shape({
          common: PropTypes.string,
        }),
        capital: PropTypes.arrayOf(PropTypes.string),
        population: PropTypes.number,
        flags: PropTypes.shape({
          png: PropTypes.string,
        }),
      }),
    }),
    PropTypes.oneOf([null]),
  ]),
};
