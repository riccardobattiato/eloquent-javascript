import { Actor } from "./Actor";
import { Vec } from "./Vec";

export class Player extends Actor {
  speed: Vec;

  constructor(pos: Vec, speed: Vec) {
    super(pos);
    this.speed = speed;
  }

  get type() {
    return "player";
  }

  static create(pos: Vec) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}

// size is the same for all instances of Player
Player.prototype.size = new Vec(0.8, 1.5);
