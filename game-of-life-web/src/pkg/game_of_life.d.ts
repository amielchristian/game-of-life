/* tslint:disable */
/* eslint-disable */
export enum Cell {
  Dead = 0,
  Alive = 1,
}
export class Universe {
  private constructor();
  free(): void;
  tick(): void;
  static new(): Universe;
  render(): string;
  width(): number;
  height(): number;
  cells(): number;
}
