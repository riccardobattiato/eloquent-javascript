import { Actor } from "./Actor";
import { State } from "./State";
import { Vec } from "./Vec";

const wobbleSpeed = 8,
  wobbleDist = 0.07;
export class Coin extends Actor {
  basePos: Vec;
  wobble: number;

  constructor(pos: Vec, basePos: Vec, wobble: number) {
    super(pos, new Vec(0.6, 0.6));

    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() {
    return "coin";
  }

  static create(pos: Vec) {
    let basePos = pos.plus(new Vec(0.2, 0.1));

    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }

  collide(state: State): State {
    let filtered = state.actors.filter((a) => a !== this);
    let status = state.status;

    if (!filtered.some((a) => a.type === "coin")) status = "won";
    return new State(state.level, filtered, status);
  }

  update(time: number): Actor {
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;

    return new Coin(
      this.basePos.plus(new Vec(0, wobblePos)),
      this.basePos,
      wobble
    );
  }
}
