import { Cell } from '../grid/cell';
import { Node } from '../grid/node';

export class recBacktracker {
  private grid: Array<Cell[]>;
  private graph: Array<Node> = [];

  constructor(grid: Array<Cell[]>) {
    this.grid = grid;
  }

  public init() {
    let id = 0;
    this.graph = [];

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
      for (let j = 1; j < this.grid[i].length; j += 2) {
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

  //iterative version of recursive backtracker using a stack
  public async DFS(x: number, y: number): Promise<any> {
    //mark current as visited
    let stack: Cell[] = [];
    let current: any = this.grid[x][y];
    current.visited = true;
    stack.push(current);

    while (stack.length > 0) {
      let ns = this.neighbors(current.id);
      if (ns.length > 0) {
        //choose a neighbor
        let i: number = this.rand(ns.length);
        let x = ns[i][0];
        let y = ns[i][1];
        let d = ns[i][2];

        //determine the wall to remove in between
        let w: Cell = this.removeWall(x, y, d);

        current.color = 'white';
        current.type = 'empty';
        await this.sleep(50);

        w.color = 'white';
        w.type = 'empty';

        current = this.grid[x][y];
        current.visited = true;
        stack.push(current);
      } else {
        current.color = 'white';
        current.type = 'empty';
        current = stack.pop(); //backtrack
      }
    }
  }

  //get the neighbors if any
  private neighbors(id: number) {
    let p;
    let ns: any = [];
    this.graph[id].neighbors.forEach((n: number[]) => {
      p = this.graph[n[0]].pos;
      if (!this.grid[p[0]][p[1]].visited) {
        ns.push([p[0], p[1], n[2]]);
      }
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

  //recursive implementation, harder to animate tho :/
  /*public DFS(x: number, y: number) {
    let current: Cell = this.grid[x][y];
    current.visited = true;
    this.path.push(current);

    while (!this.allVisited(current.id)) {
      //choose a neighbor
      let i: number = this.rand(this.ns.length);
      let x = this.ns[i][0];
      let y = this.ns[i][1];
      let d = this.ns[i][2];

      //determine the wall to remove
      let w: Cell = this.removeWall(x, y, d);

      if (w) {
        this.path.push(w);
      }
      this.DFS(x, y);
    }
  }*/
}
