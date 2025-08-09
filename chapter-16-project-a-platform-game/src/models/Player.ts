import { Actor } from "./Actor";
import { Vec } from "./Vec";

export class Player extends Actor {
  speed: Vec;

  constructor(pos: Vec, speed: Vec) {
    super(pos, new Vec(0.8, 1.5));
    this.speed = speed;
  }

  get type() {
    return "player";
  }

  static create(pos: Vec) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}
