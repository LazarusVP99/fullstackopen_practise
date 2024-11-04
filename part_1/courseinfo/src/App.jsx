import { Part1, Part2, Part3 } from "./Content/parts.jsx";
import { Header } from "./Header/header.jsx";
import { Total } from "./Total/total.jsx";
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Part1 course={course} />
      <Part2 course={course} />
      <Part3 course={course} />
      <Total total={course} />
    </div>
  );
};

export default App;
