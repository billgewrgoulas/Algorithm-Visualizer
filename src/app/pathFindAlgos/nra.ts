import { Node } from '../grid/node';
import { Heapq } from 'ts-heapq';
import { Cell } from '../grid/cell';

export class NRA {
  private graph: Node[];
  private grid: Array<Cell[]>;
  private pqs: Heapq<any>[] = [];
  private dicts: any = [];
  private spds: any = [];
  private paths: any = [];
  private bounds: any = [];
  private visited: any = [];
  private readonly minDist: Number = 100000;
  private timers: number = 0;

  private LBq: Heapq<any> = new Heapq<any>([], this.comparator);
  private bests: any = {};

  private found: boolean = false;
  private best: any = null;

  constructor(ids: number[], graph: any, grid: any) {
    const t = ids.length;
    for (let i = 0; i < t; i++) {
      let spd = new Array(graph.length).fill(this.minDist);
      let path = new Array(graph.length).fill(null);
      let v = new Array(graph.length).fill(false);
      this.spds.push(spd);
      this.paths.push(path);
      this.visited.push(v);
    }

    for (let i = 0; i < t; i++) {
      let heapq: Heapq<any> = new Heapq<any>([], this.comparator);
      this.pqs.push(heapq);
      this.dicts.push({});
    }

    graph.forEach(() => {
      this.bounds.push([this.minDist, 0]);
    });

    this.graph = graph;
    this.grid = grid;
  }

  private comparator(a: any, b: any) {
    return a[0] < b[0];
  }

  private checkBest() {
    if (!this.best || this.LBq.length() == 0) {
      return;
    }

    let v = this.LBq.top();
    while (this.bests[v[1]] && this.LBq.length() > 0) {
      this.LBq.pop();
      if (this.LBq.length() > 0) {
        v = this.LBq.top();
      }
    }

    if (this.LBq.length() == 0) {
      return;
    }

    if (v[0] > this.bounds[this.best][1]) {
      console.log('cond');
      this.found = true;
    }
  }

  private updateBest(id: number) {
    this.bests[id] = true;

    if (!this.best) {
      this.best = id;
    } else if (this.bounds[this.best][1] > this.bounds[id][1]) {
      this.best = id;
    }
  }

  private addNode(id: number, dist: number, i: number) {
    if (this.dicts[i][id]) {
      this.removeNode(id, i);
    }
    let e = [dist, id];
    this.dicts[i][id] = e;
    this.pqs[i].push(e);
  }

  private removeNode(id: number, i: number) {
    this.dicts[i][id][1] = 'removed';
    delete this.dicts[i][id];
  }

  private popNode(i: number): any {
    while (this.pqs[i].length() > 0) {
      let e = this.pqs[i].pop();
      if (e[1] != 'removed') {
        delete this.dicts[i][e[1]];
        return e;
      }
    }
    return 'done';
  }

  private Dijkstra(i: number): any {
    let v = this.popNode(i);

    if (v == 'done') {
      return 'done';
    }

    this.timers++;
    setTimeout(() => {
      this.animator(v[1]);
      this.timers--;
    }, 10);

    this.visited[i][v[1]] == true;
    this.graph[v[1]].neighbors.forEach((n: any) => {
      if (!this.visited[i][n[0]]) {
        if (this.spds[i][n[0]] > this.spds[i][v[1]] + n[1]) {
          this.spds[i][n[0]] = this.spds[i][v[1]] + n[1];
          this.paths[i][n[0]] = this.paths[i][v[1]] + '->' + n[0];
          this.addNode(n[0], this.spds[i][n[0]], i);
        }
      }
    });
    return v;
  }

  public async btmK(ids: any) {
    for (let i = 0; i < ids.length; i++) {
      this.spds[i][ids[i]] = 0;
      this.paths[i][ids[i]] = ids[i] + '';
      this.addNode(ids[i], 0, i);
    }

    while (!this.found) {
      for (let i = 0; i < ids.length; i++) {
        let v = this.Dijkstra(i);
        if (v == 'done') {
          this.found = true;
          break;
        }

        if (v[0] < this.bounds[v[1]][0]) {
          this.bounds[v[1]][0] = v[0];
        }
        this.LBq.push([this.bounds[v[1]][0], v[1]]);

        let max = -1;
        for (let k = 0; k < ids.length; k++) {
          if (this.spds[k][v[1]] > max) {
            max = this.spds[k][v[1]];
          }
        }

        this.bounds[v[1]][1] = max;
        if (max < this.minDist) {
          this.updateBest(v[1]);
        }
      }
      this.checkBest();
    }

    if (!this.best) {
      confirm('meeting point doesnt exist');
      return;
    }

    let int = setInterval(() => {
      if (this.timers == 0) {
        this.timers = -1;
        let x = this.graph[this.best].pos[0];
        let y = this.graph[this.best].pos[1];
        this.grid[x][y].end = true;
        this.grid[x][y].color = 'yellow';
        this.clear();
        this.printPaths(ids);
        clearInterval(int);
      }
    }, 10);

    await this.sleep(100);
  }

  private animator(id: any) {
    const x = this.graph[id].pos[0];
    const y = this.graph[id].pos[1];
    if (this.grid[x][y].type == 'empty') {
      this.grid[x][y].type = 'visited';
      this.grid[x][y].color = '#de00ff';
    }
  }

  private clear() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].type == 'visited') {
          this.grid[i][j].type = 'empty';
          this.grid[i][j].color = 'white';
        }
      }
    }
  }

  private printPaths(ids: any) {
    for (let i = 0; i < ids.length; i++) {
      let p = this.paths[i][this.best].split('->');
      p.forEach((e: string, index: any) => {
        setTimeout(() => {
          let x = this.graph[parseInt(e)].pos[0];
          let y = this.graph[parseInt(e)].pos[1];
          if (this.grid[x][y].type == 'empty' || this.grid[x][y].end) {
            this.grid[x][y].color = 'yellow';
            this.grid[x][y].type = 'path';
          }
        }, 70 * index);
      });
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
