import { Problem } from "./problem";
import { Raindrop } from "./raindrop";

export class WCASolver {
  private storedIterations: Array<Array<{ values: Array<number> }>> = [];
  private problem: Problem;
  private population: Array<Raindrop> = [];
  private intensities: Array<number> = [];
  private C: number;
  private constrainToleranceStart: number;
  private constrainToleranceEnd: number;
  private currentIteration: number = 0;
  private maxIterations: number = 0;

  public get getProblem() {
    return this.problem;
  }

  public get getIntensities() {
    return [...this.intensities];
  }

  public get getStoredIterations() {
    return this.storedIterations;
  }

  public constructor(
    problem: Problem,
    C: number = 2,
    constrainToleranceStart: number = 0.01,
    constrainToleranceEnd: number = 0.001,
  ) {
    this.problem = problem;
    this.C = C;
    this.constrainToleranceStart = constrainToleranceStart;
    this.constrainToleranceEnd = constrainToleranceEnd;
  }

  private _reset() {
    this.population = [];
    this.intensities = [];
    this.storedIterations = [];
    this.currentIteration = 0;
  }

  private _storeIteration() {
    const raindrops: Array<{ values: Array<number> }> = this.population.map(
      (raindrop) => ({ values: raindrop.getValues }),
    );
    this.storedIterations.push(raindrops);
  }

  public async solve(
    Nsr: number,
    initDMax: number,
    Npop: number,
    maxIterations: number,
  ): Promise<Array<Raindrop>> {
    this.maxIterations = maxIterations;
    this._reset();

    this.population = this.generateInitPopulation(Nsr, Npop);

    this.intensities = this.calcIntensities(Nsr, Npop - Nsr);

    let dMax = initDMax;
    while (this.currentIteration < maxIterations) {
      this.flowStreamsToRiversAndSea(Nsr);
      this.flowRiversToSea(Nsr);
      this.evaporateAndRain(Nsr, dMax);
      dMax = dMax - dMax / maxIterations;
      this.currentIteration++;
      this._storeIteration();
    }
    return this.population;
  }

  // is negative if second value is worse in any way
  private compareCosts = (rainDropA: Raindrop, rainDropB: Raindrop): number => {
    const tolerance =
      this.constrainToleranceStart -
      (this.currentIteration / this.maxIterations) *
        (this.constrainToleranceStart - this.constrainToleranceEnd);
    const constrainBreachA = this.problem.calcConstraintsCrossFor(
      rainDropA.getValues,
    );
    const constrainBreachB = this.problem.calcConstraintsCrossFor(
      rainDropB.getValues,
    );

    if (constrainBreachA <= tolerance && constrainBreachB <= tolerance) {
      return this.problem.isToMinimize
        ? rainDropA.getCost - rainDropB.getCost
        : rainDropB.getCost - rainDropA.getCost;
    } else if (constrainBreachA <= tolerance) {
      return -1;
    } else if (constrainBreachB <= tolerance) {
      return 1;
    } else {
      return constrainBreachA - constrainBreachB;
    }
  };

  private generateRandomRaindrop = (): Raindrop => {
    let rainDrop: Raindrop = new Raindrop(this.problem.calcCostFor);

    const newValues: Array<number> = [];
    for (let i = 0; i < this.problem.getNumOfVars; i++) {
      newValues.push(
        Math.random() * (this.problem.getUB[i] - this.problem.getLB[i]) +
          this.problem.getLB[i],
      );
    }

    rainDrop.setValues(newValues);
    return rainDrop;
  };

  private generateInitPopulation = (
    Nsr: number,
    Npop: number,
  ): Array<Raindrop> => {
    const rainDrops: Array<Raindrop> = [];
    for (let i = 0; i < Npop; i++) {
      rainDrops.push(this.generateRandomRaindrop());
    }
    rainDrops.sort(this.compareCosts);

    return rainDrops;
  };

  private calcIntensities = (
    Nsr: number,
    Nraindrops: number,
  ): Array<number> => {
    let costSums: number = 0;
    for (let i = 0; i < Nsr; i++) {
      costSums += this.population[i].getCost;
    }

    const intensities: Array<number> = [];
    for (let i = 0; i < Nsr; i++) {
      const cost = this.population[i].getCost;

      intensities.push(Math.round(Math.abs(cost / costSums) * Nraindrops));
    }

    let i = intensities.length - 1;
    while (
      intensities.reduce((prev, current) => prev + current, 0) > Nraindrops
    ) {
      if (intensities[i] < 2) {
        i--;
      } else {
        intensities[i]--;
      }
    }

    while (
      intensities.reduce((prev, current) => prev + current, 0) <
      Nraindrops - 1
    ) {
      intensities[0]++;
    }

    return intensities;
  };

  private flowStreamsToRiversAndSea = (Nsr: number) => {
    let sumOfIntensities = Nsr;
    for (let i = 0; i < Nsr; i++) {
      const currentIntensity = this.intensities[i];
      const currentRiverValues = this.population[i].getValues;
      for (
        let j = sumOfIntensities;
        j < sumOfIntensities + currentIntensity;
        j++
      ) {
        const values = this.population[j].getValues;

        const newValues = values.map((value, index) => {
          return (
            value + Math.random() * this.C * (currentRiverValues[index] - value)
          );
        });

        this.population[j].setValues(newValues);

        if (this.compareCosts(this.population[i], this.population[j]) > 0) {
          const store = this.population[i];
          this.population[i] = this.population[j];
          this.population[j] = store;
        }
      }
      sumOfIntensities += currentIntensity;
    }
  };

  private flowRiversToSea = (Nsr: number) => {
    const seaValues = this.population[0].getValues;
    for (let i = 1; i < Nsr; i++) {
      const values = this.population[i].getValues;

      const newValues = values.map((value, index) => {
        return value + Math.random() * this.C * (seaValues[index] - value);
      });

      this.population[i].setValues(newValues);
      if (this.compareCosts(this.population[0], this.population[i]) > 0) {
        const store = this.population[0];
        this.population[0] = this.population[i];
        this.population[i] = store;
      }
    }
  };

  private evaporateAndRain = (Nsr: number, dMax: number) => {
    const seaValues = this.population[0].getValues;
    let sumOfIntensities = Nsr;
    for (let i = 1; i < Nsr; i++) {
      const currentRiverValues = this.population[i].getValues;
      const currentIntensity = this.intensities[i];
      const d = Math.sqrt(
        seaValues.reduce(
          (prev, current, index) =>
            prev + Math.pow(current - currentRiverValues[index], 2),
          0,
        ),
      );
      if (d < dMax) {
        const newRainDrops: Array<Raindrop> = [];
        for (let j = 0; j < currentIntensity + 1; j++) {
          newRainDrops.push(this.generateRandomRaindrop());
        }
        newRainDrops.sort(this.compareCosts);

        this.population[i] = newRainDrops[0];
        let k = 1;
        for (
          let j = sumOfIntensities;
          j < sumOfIntensities + currentIntensity;
          j++
        ) {
          this.population[j] = newRainDrops[k];
          k++;
        }
      }
      sumOfIntensities += currentIntensity;
    }
  };
}
