import { Problem } from "../logic/problem";

const mainProblem = ([x1, x2, x3, x4, x5, x6, x7]: Array<number>) =>
  (x1 - 10) * (x1 - 10) +
  5 * (x2 - 12) * (x2 - 12) +
  x3 * x3 * x3 * x3 +
  3 * (x4 - 11) * (x4 - 11) +
  10 * x5 * x5 * x5 * x5 * x5 * x5 +
  7 * x6 * x6 +
  x7 * x7 * x7 * x7 -
  4 * x6 * x7 -
  10 * x6 -
  8 * x7;

const LB: Array<number> = [-10, -10, -10, -10, -10, -10, -10];
const UB: Array<number> = [10, 10, 10, 10, 10, 10, 10];

const constraints = [
  ([x1, x2, x3, x4, x5, x6, x7]: Array<number>) => {
    const res =
      127 - 2 * x1 * x1 - 3 * x2 * x2 * x2 * x2 - x3 - 4 * x4 * x4 - 5 * x5;
    if (res < 0) {
      return -res;
    } else {
      return 0;
    }
  },
  ([x1, x2, x3, x4, x5, x6, x7]: Array<number>) => {
    const res = 282 - 7 * x1 - 3 * x2 - 10 * x3 * x3 - x4 + x5;
    if (res < 0) {
      return -res;
    } else {
      return 0;
    }
  },
  ([x1, x2, x3, x4, x5, x6, x7]: Array<number>) => {
    const res = 196 - 23 * x1 - x2 * x2 - 6 * x6 * x6 + 8 * x7;
    if (res < 0) {
      return -res;
    } else {
      return 0;
    }
  },
  ([x1, x2, x3, x4, x5, x6, x7]: Array<number>) => {
    const res =
      -4 * x1 * x1 - x2 * x2 + 3 * x1 * x2 - 2 * x3 * x3 - 5 * x6 + 11 * x7;
    if (res < 0) {
      return -res;
    } else {
      return 0;
    }
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

const expectedSolution = {
  cost: 680.630057,
  values: [
    2.334238, 1.950249, -0.474707, 4.366854, -0.619911, 1.0304, 1.594891,
  ],
};

const A1Problem: Problem = new Problem(
  mainProblem, // main function
  true, // to minimize
  constraints, // with constraints
  7, // number of vars
  LB, // LB for all vars
  UB, // UP for all vars
  expectedSolution, // expected Optimum
);

export default A1Problem;
