// @ts-expect-error ts sucks
import { Problem } from "watercyclealgorithm/dist/solver/problem";

const mainProblem = ([x1, x2]: Array<number>) =>
  (2 * Math.sqrt(2) * x1 + x2) * 100;

const LB: Array<number> = [0, 0];
const UB: Array<number> = [1, 1];

export const constraints = [
  ([x1, x2]: Array<number>) => {
    const res =
      ((Math.sqrt(2) * x1 + x2) / (Math.sqrt(2) * x1 * x1 + 2 * x1 * x2)) * 2 -
      2;

    if (res <= 0) return 0;

    return Math.abs(res);
  },
  ([x1, x2]: Array<number>) => {
    const res = (x2 / (Math.sqrt(2) * x1 * x1 + 2 * x1 * x2)) * 2 - 2;

    if (res <= 0) return 0;

    return Math.abs(res);
  },
  ([x1, x2]: Array<number>) => {
    const res = (1 / (Math.sqrt(2) * x2 + x1)) * 2 - 2;

    if (res <= 0) return 0;

    return Math.abs(res);
  },
  (values: Array<number>) => {
    let res = 0;
    res += values.reduce((prev, current, index) => {
      if (current < LB[index]) {
        return prev + Math.abs(LB[index] - current);
      } else if (current > UB[index]) {
        return prev + Math.abs(UB[index] - current);
      } else {
        return prev + 0;
      }
    }, 0);

    return res;
  },
];

const expectedSolution = 263.895843;

const A3Problem: Problem = new Problem(
  mainProblem, // main function
  true, // to minimize
  constraints, // with constraints
  2, // number of vars
  LB, // LB for all vars
  UB, // UP for all vars
  expectedSolution, // expected Optimum
);

export default A3Problem;
