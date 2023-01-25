// @ts-expect-error ts sucks
import { Problem } from "watercyclealgorithm/dist/solver/problem";

const n = 5;

const C = 240; // Kapazität
const W = [12, 6, 17, 19, 8]; // Zeit pro einheit auf Maschine

const a1 = (values: Array<number>) => {
  const preisUmAllesAbzusätzen =
    10 / (3 - (2 * (values[0] - 3)) / Math.pow(Math.E, values[0] - 3)) + 3;

  return preisUmAllesAbzusätzen * values[0];
};

const a2 = (values: Array<number>) => {
  const preisUmAllesAbzusätzen =
    -12 / (2 - (values[1] - 3) / Math.pow(Math.E, values[1] - 3)) + 12;

  return preisUmAllesAbzusätzen * values[1];
};

const a3 = (values: Array<number>) => {
  const preisUmAllesAbzusätzen =
    -12 / (6 - (2 * (values[2] - 3)) / Math.pow(Math.E, values[2] - 3)) -
    0.3 * a2(values) +
    8;

  return preisUmAllesAbzusätzen * values[1];
};

const a4 = (values: Array<number>) => {
  const preisUmAllesAbzusätzen =
    -2 / (1 - (values[3] - 4) / Math.pow(Math.E, values[3] - 4)) + a1(values);

  return preisUmAllesAbzusätzen * values[3];
};

const a5 = (values: Array<number>) => {
  const preisUmAllesAbzusätzen =
    12 / (6 - (2 * (values[4] - 3)) / Math.pow(Math.E, values[4] - 3)) +
    0.2 * a4(values) +
    3;

  return preisUmAllesAbzusätzen * values[4];
};

const A = [a1, a2, a3, a4, a5];

const mainProblem = (values: Array<number>) => {
  let volume = 0;

  for (let j = 0; j < n; j++) {
    volume += A[j](values);
  }

  return volume;
};

const LB: Array<number> = [0, 0, 0, 0, 0];
const UB: Array<number> = [8, 9, 6, 4, 12];

const constraints: Array<any> = [
  (values: Array<number>) => {
    let arbeitsdauerAufMaschine = 0;

    for (let j = 0; j < n; j++) {
      arbeitsdauerAufMaschine += W[j] * values[j];
    }

    if (arbeitsdauerAufMaschine <= C) {
      return 0;
    }

    return arbeitsdauerAufMaschine - C;
  },
  (values: Array<number>) => {
    let res = 0;
    res += values.reduce((prev, current, index) => {
      if (current < LB[index]) {
        return prev + Math.abs(LB[index] - current);
      } else if (current > UB[index]) {
        return prev + Math.abs(current - UB[index]);
      } else {
        return prev + 0;
      }
    }, 0);

    return res;
  },
];

const expectedSolution = 1;

const ProduktionsentscheidungsProblem: Problem = new Problem(
  mainProblem, // main function
  false, // to minimize
  constraints, // with constraints
  5, // number of vars
  LB, // LB for all vars
  UB, // UP for all vars
  expectedSolution, // expected Optimum
);

export default ProduktionsentscheidungsProblem;
