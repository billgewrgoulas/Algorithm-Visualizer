import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Cell } from '../grid/cell';

@Injectable({
  providedIn: 'root',
})
export class ObserversService {
  constructor() {}

  private option = new ReplaySubject<number>(1);
  opt = this.option.asObservable();
  public changeOpt(o: number) {
    this.option.next(o);
  }

  private start = new Subject();
  prstart = this.start.asObservable();
  public swap() {
    this.start.next();
  }

  private pathFind = new Subject<number>();
  algopick = this.pathFind.asObservable();
  public chooseAlgorithm(m: number) {
    this.pathFind.next(m);
  }

  private passGrid = new Subject<Cell[][]>();
  grid = this.passGrid.asObservable();
  public deliver(g: Cell[][]) {
    this.passGrid.next(g);
  }

  private init = new Subject();
  initiate = this.init.asObservable();
  public initAlgo() {
    this.init.next();
  }
}
