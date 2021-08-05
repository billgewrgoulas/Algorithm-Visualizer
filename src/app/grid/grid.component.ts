import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cell } from './cell';
import { Subscription } from 'rxjs';
import { ObserversService } from '../services/observers.service';
import { modAstar } from '../pathFindAlgos/fightTheAlgo';
import { Builder } from '../grid/builder';

import { State } from '../globalVar';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit, OnDestroy {
  //graph info
  private grid: Cell[][] = [];
  private columns = 45;
  private rows = 19;
  private c: number[] = [];
  private next: number[] = [];
  private timer: any;

  //options
  private clicked: boolean = false;
  public option: number = 0;
  private observers: Subscription[] = [];
  private builder: Builder = new Builder();

  constructor(private share: ObserversService) {
    let id = 0;
    for (let i = 0; i < this.rows; i++) {
      let cells: Cell[] = [];
      for (let j = 0; j < this.columns; j++) {
        cells.push(new Cell('empty', 'white', id));
        id++;
      }
      this.grid.push(cells);
    }
  }

  ngOnInit(): void {
    this.observers.push(
      this.share.opt.subscribe((opt: any) => {
        this.option = opt;
        if (opt == 10) {
          this.option = 2;
          this.setPoints();
        }
      }),
      this.share.initiate.subscribe(() => {
        this.start();
      })
    );
    this.share.deliver(this.grid);
  }

  ngOnDestroy(): void {
    this.observers.forEach((observer) => {
      observer.unsubscribe();
    });
  }

  public hovered(i: number, j: number) {
    if (State.inProgress) {
      return;
    }
    if (State.type == 'f') {
      this.next = [i, j];
    }
    if (this.option == 0) {
      if (
        this.clicked &&
        this.grid[i][j].type == 'empty' &&
        !this.grid[i][j].end
      ) {
        this.grid[i][j].color = '#022335';
        this.grid[i][j].type = 'wall';
      }
    }
  }

  public setstarter(i: number, j: number) {
    if (
      State.points.length >= 10 ||
      this.option != 2 ||
      State.inProgress ||
      State.fightR
    ) {
      return;
    } else if (State.type == 'sp') {
      if (State.points.length == 2) {
        return; //only two points for path finding
      }
    } else if (State.type == 'f') {
      if (State.points.length == 1) {
        return;
      }
    }
    if (this.grid[i][j].type == 'empty') {
      State.points.push([i, j]);
      this.grid[i][j].type = 'start';
      this.grid[i][j].color = 'blue';
    }
  }

  public setPoints() {
    this.setstarter(9, 4);
    this.grid[9][30].end = true;
    this.c = [9, 30];
  }

  public mouseUp() {
    if (State.inProgress || this.option == 0 || State.fightR) {
      return;
    }
    if (State.type == 'f') {
      this.grid[this.next[0]][this.next[1]].end = true;
      this.grid[this.c[0]][this.c[1]].end = false;
      this.c = [this.next[0], this.next[1]];
    }
  }

  public start() {
    let graph = this.builder.buildgraph(this.grid);
    let astar = new modAstar(
      this.grid,
      graph,
      this.grid[this.c[0]][this.c[1]].id
    );
    State.fightR = true;
    astar.modedAstar(this.grid[9][4].id).then(() => {
      State.fightR = false;
    });
  }

  public mouseDown() {
    this.clicked = !this.clicked;
  }

  public get gridarray() {
    return this.grid;
  }

  public get draggable() {
    return State.type == 'f' && !State.fightR;
  }

  public disable() {
    this.clicked = false;
  }
}
