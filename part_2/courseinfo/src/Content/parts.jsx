const Parts = ({ courseInfo }) =>
  courseInfo.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));

export const Content = ({ parts }) => (
  <div>
    <Parts courseInfo={parts} />
  </div>
);
