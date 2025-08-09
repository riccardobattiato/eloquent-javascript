import { Actor } from "./Actor";
import { Vec } from "./Vec";

export class Coin extends Actor {
  basePos: Vec;
  wobble: number;

  constructor(pos: Vec, basePos: Vec, wobble: number) {
    super(pos);
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
}

Coin.prototype.size = new Vec(0.6, 0.6);
