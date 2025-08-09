export class Vec {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  plus(other: Vec) {
    const sumX = this.x + other.x;
    const sumY = this.y + other.y;

    return new Vec(sumX, sumY);
  }

  minus(other: Vec) {
    const diffX = this.x - other.x;
    const diffY = this.y - other.y;

    return new Vec(diffX, diffY);
  }

  times(factor: number) {
    return new Vec(this.x * factor, this.y * factor);
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
