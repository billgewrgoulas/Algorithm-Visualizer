import { Cell } from '../grid/cell';
import { Node } from '../grid/node';

export class AldousBroder {
  private grid: Array<Cell[]>;
  private graph: Array<Node> = [];
  private v: number = 0;
  private cells: Cell[] = [];

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
        this.cells.push(this.grid[i][j]);
        this.v++;
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

  public async generate(): Promise<any> {
    let current: Cell = this.cells[this.rand(this.cells.length)];
    current.visited = true;
    this.v--;

    while (this.v > 0) {
      let n = this.neighbors(current.id);
      let i: number = this.rand(n.length);
      let x = n[i][0];
      let y = n[i][1];
      let d = n[i][2];

      if (!this.grid[x][y].visited) {
        current.color = 'white';
        current.type = 'empty';
        await this.sleep(10);

        let w: Cell = this.removeWall(x, y, d);
        w.color = 'white';
        w.type = 'empty';
        await this.sleep(10);

        this.grid[x][y].color = 'white';
        this.grid[x][y].type = 'empty';
        this.grid[x][y].visited = true;
        await this.sleep(10);
        this.v--;
      }
      current = this.grid[x][y];
    }
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

  //get the wall between the current cell and neighbor based on the direction
  private removeWall(x: number, y: number, direction: number): Cell {
    let w: any;
    if (direction == 1) {
      w = this.grid[x][y + 1];
    } else if (direction == 2) {
      w = this.grid[x + 1][y];
    } else if (direction == 3) {
      w = this.grid[x][y - 1];
    } else if (direction == 4) {
      w = this.grid[x - 1][y];
    }
    return w;
  }

  private rand(x: number): number {
    return Math.floor(Math.random() * x);
  }

  private sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
