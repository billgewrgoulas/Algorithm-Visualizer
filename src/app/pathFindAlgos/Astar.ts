import { Node } from '../grid/node';
import { Heapq } from 'ts-heapq';
import { Cell } from '../grid/cell';

export class Astar {
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

  private manh(s: any, e: any) {
    let p1 = this.graph[s].pos;
    let p2 = this.graph[e].pos;
    return Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1]);
  }

  public async Astar(s: any, t: any): Promise<void> {
    let spd = new Array(this.graph.length).fill(this.minDist);
    let path: string[] = new Array(this.graph.length).fill(null);
    let visited = new Array(this.graph.length).fill(false);
    let found = false;

    spd[s] = 0;
    path[s] = s + '';

    this.addNode(s, spd[s] + this.manh(s, t));

    while (this.pq.length() > 0) {
      let v = this.popNode();
      this.animator(v[1]);
      await this.sleep(50);
      if (v == 'done') {
        break;
      }
      visited[v[1]] = true;

      if (t == v[1]) {
        found = true;
        break;
      }
      this.graph[v[1]].neighbors.forEach((n: any) => {
        if (!visited[n[0]]) {
          if (spd[n[0]] > spd[v[1]] + n[1]) {
            spd[n[0]] = spd[v[1]] + n[1];
            path[n[0]] = path[v[1]] + '->' + n[0];
            this.addNode(n[0], spd[n[0]] + this.manh(n[0], t));
          }
        }
      });
    }
    if (found) {
      this.clear();
      let p = path[t].split('->').map((p: string) => parseInt(p));
      for (const v of p) {
        let c = this.graph[v].pos;
        if (
          this.grid[c[0]][c[1]].type == 'empty' ||
          this.grid[c[0]][c[1]].end
        ) {
          this.grid[c[0]][c[1]].color = 'yellow';
          this.grid[c[0]][c[1]].type = 'path';
          await this.sleep(30);
        }
      }
    } else {
      confirm('not connected');
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
