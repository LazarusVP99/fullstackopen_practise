import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  overflow: hidden;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  vertical-align: top;
  border: 1px solid #dee2e6;
  th,
  td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  th {
    font-weight: 600;
    color: #212529;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
  }
  tbody tr:hover {
    background-color: #f8f9fa;
  }
`;

export default Table;
