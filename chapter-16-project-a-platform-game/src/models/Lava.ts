import { Actor } from "./Actor";
import { State } from "./State";
import { Vec } from "./Vec";

export class Lava extends Actor {
  speed: Vec;
  reset?: Vec;

  constructor(pos: Vec, speed: Vec, reset?: Vec) {
    super(pos, new Vec(1, 1));
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

  collide(state: State): State {
    return new State(state.level, state.actors, "lost");
  }

  update(time: number, state: State): Actor {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      // any lava
      return new Lava(newPos, this.speed, this.reset);
    } else if (this.reset) {
      // dripping lava
      return new Lava(this.reset, this.speed, this.reset);
    } else {
      // bouncing lava
      return new Lava(this.pos, this.speed.times(-1));
    }
  }
}
