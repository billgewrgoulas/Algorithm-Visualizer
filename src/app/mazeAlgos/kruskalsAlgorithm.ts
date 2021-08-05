import { Cell } from '../grid/cell';
import { Node } from '../grid/node';
import { Edge } from './edge';
import { DisjointSet } from 'dsforest';

export class randomizedKruskal {
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

  public async randKruskal(): Promise<void> {
    //set with all edges in the graph
    const edges: Set<Edge> = new Set<Edge>();
    //subsets that consist of each node at first
    const buckets: DisjointSet = new DisjointSet();

    //for each node we create two edges that connect it to
    //the neighhbor to the right and bellow
    for (let i = 1; i < this.grid.length; i += 2) {
      for (let j = 1; j < this.grid[i].length - 1; j += 2) {
        buckets.makeSet(this.grid[i][j].id);
        if (i + 2 < 19) {
          edges.add(new Edge(this.grid[i][j], this.grid[i + 2][j]));
        }
        if (j + 2 < 45) {
          edges.add(new Edge(this.grid[i][j], this.grid[i][j + 2]));
        }
      }
    }

    while (edges.size > 0) {
      //pull out a random edge s----e
      let edge: Edge = this.getRandomEdge(edges);
      edges.delete(edge);

      //check if the edge connects two disjoint subsets
      //if yes, merge the subsets and connect the cells
      if (!buckets.areConnected(edge.s.id, edge.e.id)) {
        buckets.union(edge.s.id, edge.e.id);
        edge.s.color = 'white';
        edge.s.type = 'empty';
        await this.sleep(20);
        edge.e.color = 'white';
        edge.e.type = 'empty';
        await this.sleep(20);
        this.carve(edge.s.id, edge.e.id);
        await this.sleep(20);
      }
    }
  }

  //carve the passage
  private carve(id1: number, id2: number) {
    let pos1: number[] = this.graph[id1].pos;
    let pos2: number[] = this.graph[id2].pos;
    if (pos2[0] > pos1[0]) {
      //wall below s
      this.grid[pos1[0] + 1][pos1[1]].color = 'white';
      this.grid[pos1[0] + 1][pos1[1]].type = 'empty';
    } else if (pos2[1] > pos1[1]) {
      //wall to the right
      this.grid[pos1[0]][pos1[1] + 1].color = 'white';
      this.grid[pos1[0]][pos1[1] + 1].type = 'empty';
    }
  }

  // get a random edge from the set
  private getRandomEdge(set: Set<Edge>): any {
    let index = this.rand(set.size);
    let cntr = 0;
    for (let key of set.keys()) {
      if (cntr++ === index) {
        return key;
      }
    }
  }

  private rand(x: number): number {
    return Math.floor(Math.random() * x);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
