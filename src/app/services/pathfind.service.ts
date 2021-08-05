import { Inject, Injectable } from '@angular/core';
import { Cell } from '../grid/cell';
import { Node } from '../grid/node';
import { Astar } from '../pathFindAlgos/Astar';
import { State } from '../globalVar';
import { BFS } from '../pathFindAlgos/BFS';
import { DFS } from '../pathFindAlgos/DFS';
import { UCS } from '../pathFindAlgos/UCS';

@Injectable({
  providedIn: 'root',
})
export class PathfindService {
  private grid: Cell[][];
  private graph: Node[] = [];

  constructor(@Inject(Cell) grid: Cell[][]) {
    this.grid = grid;
  }

  public chooseAlgo(o: number, graph: Node[], s: number, e: number) {
    if (State.inProgress) {
      return;
    }
    State.inProgress = true;
    this.graph = graph;
    let p = this.graph[e].pos;
    this.grid[p[0]][p[1]].end = true;
    this.grid[p[0]][p[1]].color = 'white';
    if (o == 1) {
      this.Astar(s, e);
    } else if (o == 2) {
      this.bfs(s, e);
    } else if (o == 3) {
      this.dfs(s, e);
    } else if (o == 4) {
      this.ucs(s, e);
    }
  }

  public Astar(s: number, e: number) {
    let astar: Astar = new Astar(this.grid, this.graph);
    astar.Astar(s, e).then(() => {
      State.inProgress = false;
    });
  }

  public bfs(s: number, e: number) {
    let bfs: BFS = new BFS(this.grid, this.graph);
    bfs.bfs(s, e).then(() => {
      State.inProgress = false;
    });
  }

  public dfs(s: number, e: number) {
    let dfs: DFS = new DFS(this.grid, this.graph);
    dfs.dfs(s, e).then(() => {
      State.inProgress = false;
    });
  }

  public ucs(s: number, e: number) {
    let ucs: UCS = new UCS(this.grid, this.graph);
    ucs.UCS(s, e).then(() => {
      State.inProgress = false;
    });
  }
}
