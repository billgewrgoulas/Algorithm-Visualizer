export class Cell {
  public type: string = '';
  public color: string = '';
  public id: number = 0;
  public end: boolean = false;
  public visited: boolean = false;
  public meet: boolean = false;

  constructor(type: string = '', color: string = '', id: number = 0) {
    this.type = type;
    this.color = color;
    this.id = id;
  }
}
