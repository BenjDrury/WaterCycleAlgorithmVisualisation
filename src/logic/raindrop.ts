export class Raindrop {
  private calcCosts: (values: Array<number>) => number;
  private values: Array<number> = [];
  private cost: number = 0;

  constructor(calcCosts: (values: Array<number>) => number) {
    this.calcCosts = calcCosts;
  }

  public get getValues() {
    return [...this.values];
  }
  public get getCost() {
    return this.cost;
  }
  public setValues(values: Array<number>) {
    this.values = values;
    this.cost = this.calcCosts(values);
  }
}
