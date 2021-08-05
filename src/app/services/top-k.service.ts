import { Inject, Injectable } from '@angular/core';
import { State } from '../globalVar';
import { Cell } from '../grid/cell';
import { Node } from '../grid/node';
import { NRA } from '../pathFindAlgos/nra';

@Injectable({
  providedIn: 'root',
})
export class TopKService {
  private grid: Cell[][];
  private graph: Node[] = [];

  constructor(@Inject(Cell) grid: Cell[][]) {
    this.grid = grid;
  }

  public chooseAlgo(o: number, graph: Node[], ids: number[]) {
    if (State.inProgress) {
      return;
    }
    State.inProgress = true;
    this.graph = graph;
    if (o == 6) {
      this.nra(ids);
    }
  }

  private nra(ids: number[]) {
    let nra = new NRA(ids, this.graph, this.grid);
    nra.btmK(ids).then(() => {
      setTimeout(() => {
        State.inProgress = false;
      }, 3000);
    });
  }
}
