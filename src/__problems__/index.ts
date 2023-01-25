import { Problem } from "watercyclealgorithm/dist/solver/problem";
import A1Problem from "./A1";
import A2Problem from "./A2";
import A3Problem from "./A3";
import ProduktionsentscheidungsProblem from "./Produktionsentscheidung";

const problems: Array<{ problem: Problem; name: string; img: string }> = [
  { problem: A1Problem, name: "Problem A1", img: "assets/A1.PNG" },
  { problem: A2Problem, name: "Problem A2", img: "assets/A2.PNG" },
  { problem: A3Problem, name: "Problem A3", img: "assets/A3.PNG" },
  {
    problem: ProduktionsentscheidungsProblem,
    name: "Produktions-entscheidungsproblem",
    img: "assets/produktionsentscheidungsproblem.PNG",
  },
];

export default problems;
