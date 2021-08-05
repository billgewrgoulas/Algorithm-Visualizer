import { Cell } from '../grid/cell';
import { Node } from '../grid/node';

export class randomizedPrim {
  private grid: Array<Cell[]>;
  private graph: Array<Node> = [];

  constructor(grid: Array<Cell[]>) {
    this.grid = grid;
  }

  public init() {
    let id = 0;

    this.grid.forEach((row: Cell[]) => {
      row.forEach((c: Cell) => {
        c.color = '#022335';
        c.type = 'wall';
        c.visited = false;
      });
    });

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.graph.push(new Node(id, [i, j]));
        id++;
      }
    }

    //determine the neighbors as well as the direction of the walls in between
    //each node must be surrounded by walls
    for (let i = 1; i < this.grid.length; i += 2) {
      for (let j = 1; j < this.grid[i].length - 1; j += 2) {
        id = this.grid[i][j].id;
        if (j - 2 >= 0) {
          this.graph[id].setneighbor(this.grid[i][j - 2].id, 1, 1); //west
        }

        if (i - 2 >= 0) {
          this.graph[id].setneighbor(this.grid[i - 2][j].id, 1, 2); //north
        }

        if (j + 2 < 45) {
          this.graph[id].setneighbor(this.grid[i][j + 2].id, 1, 3); //east
        }

        if (i + 2 < 19) {
          this.graph[id].setneighbor(this.grid[i + 2][j].id, 1, 4); //south
        }
      }
    }
  }

  public async randPrim(x: number, y: number): Promise<any> {
    //starting node only node in set S, where S + V = G
    const pathSet: Set<Cell> = new Set<Cell>();
    pathSet.add(this.grid[x][y]);

    while (pathSet.size > 0) {
      //get a random cell from the set S, mark it as visited
      let cell: Cell = this.getRandomCell(pathSet);
      cell.color = 'white';
      cell.type = 'empty';
      cell.visited = true;
      pathSet.delete(cell);
      await this.sleep(20);

      //get the neighbors in graph V = G - S
      let neighbors = this.neighbors(cell.id);

      //determine the already visited neighbors, this will be the frontier of V
      let s: number[][] = [];
      neighbors.forEach((n) => {
        if (this.grid[n[0]][n[1]].visited) {
          s.push(n);
        }
      });

      //randomly connect to one of them if any
      let k = 0,
        l = 0,
        d = 0;
      if (s.length > 0) {
        //get a random neighbor in S
        let i = this.rand(s.length);
        k = s[i][0];
        l = s[i][1];
        d = s[i][2];

        //determine the wall to remove in between cell and s[i]
        let w: Cell = this.removeWall(k, l, d);

        //carve the passage between the cell and the neighbor
        await this.sleep(20);
        w.color = 'white';
        w.type = 'empty';

        //mark the cell s[i], adding it into the S
        await this.sleep(20);
        this.grid[k][l].type = 'empty';
        this.grid[k][l].color = 'white';
        this.grid[k][l].visited = true;
      }

      //add the unvisited neighbors in the new V into the set
      neighbors.forEach((n) => {
        if (!this.grid[n[0]][n[1]].visited) {
          pathSet.add(this.grid[n[0]][n[1]]);
        }
      });
    }
  }

  //get the wall between the current cell and neighbor based on the direction
  private removeWall(x: number, y: number, direction: number): Cell {
    let w: Cell;

    if (direction == 1) {
      w = this.grid[x][y + 1];
    } else if (direction == 2) {
      w = this.grid[x + 1][y];
    } else if (direction == 3) {
      w = this.grid[x][y - 1];
    } else {
      w = this.grid[x - 1][y];
    }
    return w;
  }

  // get a random cell from the set
  public getRandomCell(set: Set<Cell>): Cell {
    let index = this.rand(set.size);
    let cntr = 0;
    for (let key of set.keys()) {
      if (cntr++ === index) {
        return key;
      }
    }
    return new Cell();
  }

  //get the neighbors if any
  private neighbors(id: number): number[][] {
    let x, y;
    let ns: number[][] = [];
    this.graph[id].neighbors.forEach((n: number[]) => {
      x = this.graph[n[0]].pos[0];
      y = this.graph[n[0]].pos[1];
      ns.push([x, y, n[2]]);
    });
    return ns;
  }

  private rand(x: number): number {
    return Math.floor(Math.random() * x);
  }

  private sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
