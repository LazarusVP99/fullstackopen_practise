import { PropTypes } from "prop-types";

const CountrySearch = ({ searchValue, setSearchValue }) => {
  const handleSearch = ({ target }) => setSearchValue(target.value);
  return (
    <div id="search-box">
      <label>
        Find countries:
        <input
          type="search"
          name="country_search"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
        />
      </label>
    </div>
  );
};

CountrySearch.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default CountrySearch;
