import type { Vec } from "./Vec";

export abstract class Actor {
  pos: Vec;
  size!: Vec;

  constructor(pos: Vec) {
    this.pos = pos;
  }

  abstract get type(): string;

  static create(pos: Vec, ch?: string): Actor {
    throw new Error("Not implemented");
  }
}
