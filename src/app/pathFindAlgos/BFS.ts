import { Node } from '../grid/node';
import { Cell } from '../grid/cell';

export class BFS {
  private graph: Node[];
  private grid: Cell[][];

  constructor(grid: Cell[][], graph: Node[]) {
    this.grid = grid;
    this.graph = graph;
  }

  public async bfs(s: number, e: number) {
    let q: number[] = [];
    q.push(s);
    const p = this.graph[s].pos;
    this.grid[p[0]][p[1]].visited = true;
    let found = false;
    let path = [];
    let previous: any[] = [];
    this.graph.forEach((v) => {
      previous.push(null);
    });

    while (q.length > 0) {
      let n: any = q.shift();
      path.push(n);
      await this.sleep(40);
      if (n == e) {
        found = true;
        break;
      }

      this.graph[n].neighbors.forEach((el) => {
        const p = this.graph[el[0]].pos;
        if (!this.grid[p[0]][p[1]].visited) {
          this.grid[p[0]][p[1]].visited = true;
          previous[el[0]] = n;
          q.push(el[0]);
          this.animator(p[0], p[1]);
        }
      });
    }
    if (found) {
      this.clear();
      let cr = previous[e];
      let path = [e];
      while (cr != s) {
        path.push(cr);
        cr = previous[cr];
      }
      for (let i = path.length - 1; i > -1; i--) {
        const v = path[i];
        const p = this.graph[v].pos;
        this.grid[p[0]][p[1]].color = 'yellow';
        this.grid[p[0]][p[1]].type = 'path';
        await this.sleep(50);
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
