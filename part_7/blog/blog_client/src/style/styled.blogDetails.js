import styled from 'styled-components';

const BlogDetailsContainer = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  border: 1px solid rgb(201, 213, 224);
  margin: 1rem 0;

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    color: #212529;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    color: #212529;
  }

  button {
    margin-left: 1.5rem;
    text-transform: uppercase;
    padding: 0.5rem 1.2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #0056b3;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default BlogDetailsContainer;
