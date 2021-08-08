import { Cell } from '../grid/cell';

export class recursiveDivision {
  private grid: Array<Cell[]> = new Array<Cell[]>();

  constructor(grid: Array<Cell[]>) {
    this.grid = grid;
  }

  public async recDiv(
    sx: number,
    sy: number,
    ex: number,
    ey: number
  ): Promise<any> {
    const width: number = ex - sx;
    const height: number = ey - sy;

    //base case
    if (height < 2 || width < 2) {
      return;
    }

    //determine orientation and recurse
    if (width < height) {
      //horizontal
      let xp = this.rand(ex - sx + 1) + sx; //passage
      let yp = this.rand(ey - sy - 1) + sy + 1; //start of the wall

      if (this.grid[yp][sx - 1].type == 'empty') {
        xp = sx;
      } else if (this.grid[yp][ex + 1].type == 'empty') {
        xp = ex;
      }

      for (let i = sx; i <= ex; i++) {
        if (i != xp) {
          this.grid[yp][i].color = '#022335';
          this.grid[yp][i].type = 'wall';
          await this.sleep(40);
        }
      }

      //upper subfield bounds
      this.recDiv(sx, sy, ex, yp - 1); //the animation looks cooler if we let the threads run in parallel ;)
      // lower subfield bounds
      this.recDiv(sx, yp + 1, ex, ey);
    } else {
      //vertical
      let xp = this.rand(ex - 1 - (sx + 1) + 1) + sx + 1;
      let yp = this.rand(ey + 1 - sy) + sy;

      if (this.grid[sy - 1][xp].type == 'empty') {
        yp = sy;
      } else if (this.grid[ey + 1][xp].type == 'empty') {
        yp = ey;
      }

      for (let i = sy; i <= ey; i++) {
        if (i != yp) {
          this.grid[i][xp].color = '#022335';
          this.grid[i][xp].type = 'wall';
          await this.sleep(40);
        }
      }

      //left subfield bounds
      this.recDiv(sx, sy, xp - 1, ey);
      // right subfield bounds
      this.recDiv(xp + 1, sy, ex, ey);
    }
  }

  public async perimeter() {
    for (let i = 0; i < 19; i++) {
      this.grid[i][0].color = '#022335';
      this.grid[i][0].type = 'wall';
      this.grid[i][44].color = '#022335';
      this.grid[i][44].type = 'wall';
      await this.sleep(10);
    }
    for (let i = 0; i < 45; i++) {
      this.grid[0][i].color = '#022335';
      this.grid[0][i].type = 'wall';
      this.grid[18][i].color = '#022335';
      this.grid[18][i].type = 'wall';
      await this.sleep(10);
    }
  }

  private sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private rand(x: number): number {
    return Math.floor(Math.random() * x);
  }
}
