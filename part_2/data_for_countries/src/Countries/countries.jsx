const Countries = ({ search, handleOnCountryClick }) =>
  search.countries.map(({ name }) => (
    <div key={name.common} className="countries-list-wrapper">
      <h2>{name.common}</h2>
      <button type="button" onClick={() => handleOnCountryClick(name.common)}>
        Show Info
      </button>
    </div>
  ));

export default Countries;
