export const Total = (props) => {
  const totalVal =
    props.total.parts[0].exercises +
    props.total.parts[1].exercises +
    props.total.parts[2].exercises;
  return <div>Number of exercises {totalVal}</div>;
};
