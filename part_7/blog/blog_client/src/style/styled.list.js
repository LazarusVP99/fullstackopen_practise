import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0.6rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  overflow: hidden;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  vertical-align: top;
  border: 1px solidrgb(201, 213, 224);
  li {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  li:first-child {
    border-top: none;
  }
  li:last-child {
    border-bottom: none;
  }
`;

export default List;
