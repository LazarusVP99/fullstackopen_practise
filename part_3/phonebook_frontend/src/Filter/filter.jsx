import { PropTypes } from "prop-types";

const Filter = ({ filterValue, handleSearch }) => (
  <div>
    filter shown with{" "}
    <input
      type="text"
      placeholder="filter by name"
      value={filterValue}
      onChange={handleSearch}
    />
  </div>
);

Filter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};
export default Filter;
