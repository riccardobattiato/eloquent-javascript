import { Actor, type Keys } from "./Actor";
import type { State } from "./State";
import { Vec } from "./Vec";

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;
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

  update(time: number, state: State, keys: Keys): Actor {
    // Horizontal motion
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;

    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
      pos = movedX;
    }

    // Vertical motion
    let ySpeed = this.speed.y + time * gravity;
    let movedY = pos.plus(new Vec(0, ySpeed * time));

    if (!state.level.touches(movedY, this.size, "wall")) {
      // no walls
      pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
      // jump!
      ySpeed - jumpSpeed;
    } else {
      // bumped into something
      ySpeed = 0;
    }

    return new Player(pos, new Vec(xSpeed, ySpeed));
  }

  // TODO useless method, fix abstract class
  collide(state: State): State {
    return state;
  }
}
