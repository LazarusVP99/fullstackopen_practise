import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const navigate = useNavigate();

  const { reset: resetContent, ...contentVal } = useField("content");
  const { reset: resetAuthor, ...authorVal } = useField("author");
  const { reset: resetInfo, ...infoVal } = useField("info");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: contentVal.value,
      author: authorVal.value,
      info: infoVal.value,
      votes: 0,
    });
    props.setNotification(`a new anecdote ${contentVal.value} created!`);
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault();

    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentVal} />
        </div>
        <div>
          author
          <input {...authorVal} />
        </div>
        <div>
          url for more info
          <input {...infoVal} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
