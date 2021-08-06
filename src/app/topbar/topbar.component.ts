import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { State } from '../globalVar';
import { Builder } from '../grid/builder';
import { Cell } from '../grid/cell';
import { MazesService } from '../services/mazes.service';
import { ObserversService } from '../services/observers.service';
import { PathfindService } from '../services/pathfind.service';
import { TopKService } from '../services/top-k.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  public options: boolean[] = [true, false, false, false, false];
  private algos: string[] = [
    'Visualize Astar',
    'Visualize BFS',
    'Visualize DFS',
    'Visualize UCS',
    'Visualize NRA',
    'Fight the Algorithm',
  ];
  private index: any = 0;
  private observers: Subscription[] = [];
  private grid: Cell[][] = [];
  private mazeService?: MazesService;
  private pathService?: PathfindService;
  private topkService?: TopKService;
  private builder: Builder = new Builder();
  private opt: number = 0;
  public pathFind: string = 'Visualize';

  constructor(private share: ObserversService) {}

  ngOnInit(): void {
    this.share.changeOpt(2);
    this.observers.push(
      this.share.prstart.subscribe(() => {
        this.start();
      }),
      this.share.grid.subscribe((g: Cell[][]) => {
        this.grid = g;
        this.mazeService = new MazesService(this.grid);
        this.pathService = new PathfindService(this.grid);
        this.topkService = new TopKService(this.grid);
      })
    );
  }

  ngOnDestroy(): void {
    this.observers.forEach((observer) => {
      observer.unsubscribe();
    });
  }

  public walls() {
    this.options[this.index] = false;
    this.options[1] = true;
    this.index = 1;
    this.share.changeOpt(0);
  }

  public clear(opt: number) {
    this.options[this.index] = false;
    this.options[2] = true;
    this.index = 2;
    if (opt == 1) {
      this.mazeService?.clear();
      State.points = [];
    } else if (opt == 2) {
      this.mazeService?.clearPathAndPoints();
      State.points = [];
    } else if (opt == 3) {
      this.mazeService?.clearPath();
    } else if (opt == 4) {
      this.mazeService?.clearWalls();
    }

    if (State.type == 'f') {
      this.fight();
    }
  }

  public start() {
    this.options[this.index] = false;
    this.options[0] = true;
    this.index = 0;
    this.share.changeOpt(2);
  }

  public visualize() {
    if (State.inProgress || State.fightR) {
      return;
    }

    if (State.type == '') {
      confirm('choose algorithm');
      return;
    }

    if (State.type == 'f') {
      this.share.initAlgo();
      return;
    }

    this.options[this.index] = false;
    this.options[3] = true;
    this.index = 3;

    //check if points were choosen properly
    if (State.points.length < 2) {
      if (State.type == 'sp') {
        confirm('select two points!!');
      } else {
        confirm('select two or more points!!');
      }
      this.start();
      return;
    }
    let ids: number[] = [];
    State.points.forEach((s: number[]) => {
      let id = this.grid[s[0]][s[1]].id;
      ids.push(id);
    });

    //construct the graph and choose algorithm
    let graph = this.builder.buildgraph(this.grid);
    if (State.type == 'sp') {
      this.pathService?.chooseAlgo(this.opt, graph, ids[0], ids[1]);
    } else {
      this.topkService?.chooseAlgo(this.opt, graph, ids);
    }
  }

  public mazes(opt: number) {
    this.mazeService?.mazePicker(opt);
  }

  public pathFinding(opt: number) {
    if (State.type != 'sp') {
      this.mazeService?.clearPath();
    }
    if (State.points.length > 2) {
      State.points = [];
      this.mazeService?.clearPathAndPoints();
    }
    if (State.type == 'f') {
      this.mazeService?.clear();
    }
    this.opt = opt;
    this.pathFind = this.algos[opt - 1];
    State.type = 'sp';
    this.share.changeOpt(2);
  }

  public topKq(o: number) {
    if (State.type != 'pf') {
      this.mazeService?.clearPath();
    }
    if (State.type == 'f') {
      this.mazeService?.clear();
    }
    this.opt = o;
    this.pathFind = this.algos[o - 1];
    State.type = 'pf';
    this.share.changeOpt(2);
  }

  public fight() {
    this.pathFind = this.algos[5];
    State.type = 'f';
    State.points = [];
    this.mazeService?.clear();
    this.share.changeOpt(10);
  }
}
