import { Cell } from './cell';
import { Node } from './node';

export class Builder {
  constructor() {}

  public buildgraph(grid: Cell[][]): any {
    //construct the nodes
    let graph: Node[] = [];
    let id = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        graph.push(new Node(id, [i, j]));
        id++;
      }
    }

    //determine the neighbors
    id = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].type != 'wall') {
          grid[i][j].visited = false;
          if (j - 1 >= 0) {
            if (grid[i][j - 1].type != 'wall') {
              graph[id].setneighbor(grid[i][j - 1].id, 1);
            }
          }

          if (i - 1 >= 0) {
            if (grid[i - 1][j].type != 'wall') {
              graph[id].setneighbor(grid[i - 1][j].id, 1);
            }
          }

          if (j + 1 < 45) {
            if (grid[i][j + 1].type != 'wall') {
              graph[id].setneighbor(grid[i][j + 1].id, 1);
            }
          }

          if (i + 1 < 19) {
            if (grid[i + 1][j].type != 'wall') {
              graph[id].setneighbor(grid[i + 1][j].id, 1);
            }
          }
        }
        id++;
      }
    }
    return graph;
  }
}
