import { Node } from '../grid/node';
import { Cell } from '../grid/cell';

export class DFS {
  private graph: Node[];
  private grid: Cell[][];

  constructor(grid: Cell[][], graph: Node[]) {
    this.grid = grid;
    this.graph = graph;
  }

  public async dfs(s: number, e: number) {
    let stack: number[] = [];
    stack.push(s);
    let found = false;
    let path = [];

    while (stack.length > 0) {
      let v: any = stack.pop();
      let p = this.graph[v].pos;
      path.push(v);

      this.animator(p[0], p[1]);
      await this.sleep(10);
      if (v == e) {
        found = true;
        break;
      }
      if (!this.grid[p[0]][p[1]].visited) {
        this.grid[p[0]][p[1]].visited = true;
        this.graph[v].neighbors.forEach((n) => {
          p = this.graph[n[0]].pos;
          stack.push(n[0]);
        });
      }
    }
    if (found) {
      this.clear();
      for (const v of path) {
        let x = this.graph[v].pos[0];
        let y = this.graph[v].pos[1];
        if (this.grid[x][y].type == 'empty' || this.grid[x][y].end) {
          this.grid[x][y].color = 'yellow';
          this.grid[x][y].type = 'path';
          await this.sleep(20);
        }
      }
    } else {
      confirm('not connected');
    }
  }

  private clear() {
    this.grid.forEach((r: Cell[]) => {
      r.forEach((c: Cell) => {
        if (c.type == 'visited') {
          c.color = 'white';
          c.type = 'empty';
          c.visited = false;
          c.end = false;
        }
      });
    });
  }

  private animator(x: number, y: number) {
    if (this.grid[x][y].type == 'empty') {
      this.grid[x][y].type = 'visited';
      this.grid[x][y].color = '#4d8ab1';
    }
  }

  private sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
