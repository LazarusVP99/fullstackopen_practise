export const Part1 = (props) => (
  <p>
    {props.course.parts[0].name} {props.course.parts[0].exercises}
  </p>
);
export const Part2 = (props) => (
  <p>
    {props.course.parts[1].name} {props.course.parts[1].exercises}
  </p>
);
export const Part3 = (props) => (
  <p>
    {props.course.parts[2].name} {props.course.parts[2].exercises}
  </p>
);
