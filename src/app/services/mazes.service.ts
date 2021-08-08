import { Injectable } from '@angular/core';
import { recursiveDivision } from '../mazeAlgos/recursiveDiv';
import { recBacktracker } from '../mazeAlgos/recursiveBacktracker';
import { randomizedPrim } from '../mazeAlgos/primsAlgorithm';
import { randomizedKruskal } from '../mazeAlgos/kruskalsAlgorithm';
import { AldousBroder } from '../mazeAlgos/AldousBroder';
import { Cell } from '../grid/cell';
import { Inject } from '@angular/core';
import { State } from '../globalVar';

@Injectable({
  providedIn: 'root',
})
export class MazesService {
  private grid: Cell[][];
  private prim: randomizedPrim;
  private recDiv: recursiveDivision;
  private recB: recBacktracker;
  private kruskal: randomizedKruskal;
  private aldousBroder: AldousBroder;

  constructor(@Inject(Cell) grid: Cell[][]) {
    this.grid = grid;
    this.prim = new randomizedPrim(grid);
    this.recDiv = new recursiveDivision(grid);
    this.recB = new recBacktracker(grid);
    this.kruskal = new randomizedKruskal(grid);
    this.aldousBroder = new AldousBroder(this.grid);
  }

  public mazePicker(option: number) {
    if (State.inProgress || State.fightR || State.type == 'f') {
      return;
    }
    this.clear();
    State.inProgress = true;
    if (option == 1) {
      this.recursiveDivision();
    } else if (option == 2) {
      this.backtracker();
    } else if (option == 3) {
      this.randKruskal();
    } else if (option == 4) {
      this.randPrim();
    } else if (option == 5) {
      this.alBroder();
    }
  }

  public alBroder() {
    this.aldousBroder.init();
    this.aldousBroder.generate().then(() => {
      State.inProgress = false;
    });
  }

  public randKruskal() {
    this.kruskal.init();
    this.kruskal.randKruskal().then(() => {
      State.inProgress = false;
    });
  }

  public backtracker() {
    this.recB.init();
    this.recB.DFS(1, 1).then(() => {
      State.inProgress = false;
    });
  }

  public randPrim() {
    this.prim.init();
    this.prim.randPrim(1, 1).then(() => {
      State.inProgress = false;
    });
  }

  public recursiveDivision() {
    this.recDiv.perimeter();
    this.recDiv.recDiv(1, 1, 45 - 2, 19 - 2).then(() => {
      setTimeout(() => {
        State.inProgress = false;
      }, 4200);
    });
  }

  public clearPathAndPoints() {
    if (State.inProgress || State.fightR) {
      return;
    }
    State.points = [];
    this.grid.forEach((r: Cell[]) => {
      r.forEach((c: Cell) => {
        if (
          c.color == 'yellow' ||
          c.color == 'blue' ||
          c.type == 'visited' ||
          c.color == 'purple' ||
          c.end
        ) {
          c.color = 'white';
          c.type = 'empty';
          c.visited = false;
          c.end = false;
          c.meet = false;
        }
      });
    });
  }

  public clearWalls() {
    if (State.inProgress || State.fightR) {
      return;
    }
    this.grid.forEach((r: Cell[]) => {
      r.forEach((c: Cell) => {
        if (c.type == 'wall') {
          c.color = 'white';
          c.type = 'empty';
          c.visited = false;
          c.end = false;
          c.meet = false;
        }
      });
    });
  }

  public clearPath() {
    if (State.inProgress || State.fightR) {
      return;
    }
    this.grid.forEach((r: Cell[]) => {
      r.forEach((c: Cell) => {
        if (c.color == 'yellow' && !c.end) {
          c.color = 'white';
          c.type = 'empty';
        } else if (c.end && c.meet) {
          c.color = 'white';
          c.type = 'empty';
        } else if (c.end) {
          c.color = 'blue';
          c.type = 'start';
        }
        c.end = false;
        c.visited = false;
        c.meet = false;
      });
    });
  }

  public clear() {
    if (State.inProgress || State.fightR) {
      return;
    }
    State.points = [];
    this.grid.forEach((r: Cell[]) => {
      r.forEach((c: Cell) => {
        c.color = 'white';
        c.type = 'empty';
        c.visited = false;
        c.end = false;
        c.meet = false;
      });
    });
  }
}
