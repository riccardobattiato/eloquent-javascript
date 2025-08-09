import type { Vec } from "./Vec";

export abstract class Actor {
  pos: Vec;
  size: Vec;

  constructor(pos: Vec, size: Vec) {
    this.pos = pos;
    this.size = size;
  }

  abstract get type(): string;

  static create(pos: Vec, ch?: string): Actor {
    throw new Error("Not implemented");
  }
}
