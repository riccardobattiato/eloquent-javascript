import { Actor } from "./Actor";
import { Vec } from "./Vec";

export class Lava extends Actor {
  speed: Vec;
  reset?: Vec;

  constructor(pos: Vec, speed: Vec, reset?: Vec) {
    super(pos);
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return "lava";
  }

  static create(pos: Vec, ch: string) {
    switch (ch) {
      case "=":
        return new Lava(pos, new Vec(2, 0));
      case "|":
        return new Lava(pos, new Vec(0, 2));
      case "v":
      default:
        return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);
