const Total = ({ total }) => {
  const totalCount = total.map((a) => a.exercises).reduce((a, b) => a + b);

  return <h3>Total of {totalCount} exercises</h3>;
};

export default Total;
