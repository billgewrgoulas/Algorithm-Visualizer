import { Node } from '../grid/node';
import { Heapq } from 'ts-heapq';
import { Cell } from '../grid/cell';

export class UCS {
  private graph: Node[];
  private grid: Cell[][];
  private dict: any = {};
  private pq: Heapq<any> = new Heapq<any>([], this.comparator);
  private readonly minDist: Number = 100000;

  constructor(grid: Cell[][], graph: Node[]) {
    this.grid = grid;
    this.graph = graph;
  }

  private addNode(id: number, dist: number) {
    if (this.dict[id]) {
      this.removeNode(id);
    }
    let e = [dist, id];
    this.dict[id] = e;
    this.pq.push(e);
  }

  private removeNode(id: number) {
    this.dict[id][1] = 'removed';
    delete this.dict[id];
  }

  private popNode(): any {
    while (this.pq.length() > 0) {
      let e = this.pq.pop();
      if (e[1] != 'removed') {
        delete this.dict[e[1]];
        return e;
      }
    }
    confirm('nodes are not connected');
    return 'done';
  }

  private comparator(a: any, b: any) {
    return a[0] < b[0];
  }

  public async UCS(s: any, t: any): Promise<void> {
    let spd = new Array(this.graph.length).fill(this.minDist);
    let path: string[] = new Array(this.graph.length).fill(null);
    let explored = new Array(this.graph.length).fill(false);
    let found = false;

    path[s] = s + '';
    spd[s] = 0;
    this.addNode(s, spd[s]);

    while (this.pq.length() > 0) {
      let v = this.popNode();
      this.animator(v[1]);
      await this.sleep(20);
      if (v[1] == 'done') {
        break;
      }
      explored[v[1]] = true;

      if (t == v[1]) {
        found = true;
        break;
      }
      this.graph[v[1]].neighbors.forEach((n: any) => {
        if (!explored[n[0]]) {
          path[n[0]] = path[v[1]] + '->' + n[0];
          spd[n[0]] = spd[v[1]] + n[1];
          this.addNode(n[0], spd[n[0]]);
        }
      });
    }
    if (found) {
      this.clear();
      this.printPath(path[t].split('->').map((p: string) => parseInt(p)));
    } else {
      confirm('nodes are not connected');
    }
  }

  private animator(id: any) {
    const x = this.graph[id].pos[0];
    const y = this.graph[id].pos[1];
    if (this.grid[x][y].type == 'empty') {
      this.grid[x][y].type = 'visited';
      this.grid[x][y].color = '#4d8ab1';
    }
  }

  private printPath(path: number[]) {
    path.forEach((p, index) => {
      setTimeout(() => {
        let x = this.graph[p].pos[0];
        let y = this.graph[p].pos[1];
        if (this.grid[x][y].type == 'empty' || this.grid[x][y].end) {
          this.grid[x][y].color = 'yellow';
          this.grid[x][y].type = 'path';
        }
      }, 60 * index);
    });
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

  private sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
