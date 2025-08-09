import type { State } from "./State";
import type { Vec } from "./Vec";

export type Keys = Record<string, boolean>;
export abstract class Actor {
  pos: Vec;
  size: Vec;

  constructor(pos: Vec, size: Vec) {
    this.pos = pos;
    this.size = size;
  }

  abstract get type(): string;

  abstract collide(state: State): State;

  abstract update(time: number, state: State, keys: Keys): Actor;

  static create(pos: Vec, ch?: string): Actor {
    throw new Error("Not implemented");
  }
}
