export class Node {
  public id: number = 0;
  public pos: number[] = []; //xAxis and yAxis on the grid
  public neighbors: number[][] = [];

  constructor(id: number, pos: any) {
    this.id = id;
    this.pos = pos;
  }

  public setneighbor(id: number, cost: number, direction: number = 0) {
    let n: number[] = [id, cost, direction]; //we need the direction for the recursive backtracker
    this.neighbors.push(n);
  }
}
