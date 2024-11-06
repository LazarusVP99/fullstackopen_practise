import { Content } from "../Content/parts";
import Header from "../Header/header";
import Total from "../Total/total";

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total total={course.parts} />
  </>
);

export default Course;
