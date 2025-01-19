import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    dispatch(filterAnecdotes(target.value));
  };

  return (
    <div className="filter_container">
      <span>filter</span>
      <input
        placeholder="Search anecdotes..."
        type="search"
        name="filter"
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
