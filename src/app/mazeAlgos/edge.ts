import { Cell } from '../grid/cell';

export class Edge {
  public s: Cell;
  public e: Cell;

  constructor(start: Cell, end: Cell) {
    this.s = start;
    this.e = end;
  }
}
