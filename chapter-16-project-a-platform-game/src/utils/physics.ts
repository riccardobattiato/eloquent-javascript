import type { Actor } from "../models/Actor";

export function overlap(a: Actor, b: Actor) {
  return (
    a.pos.x + a.size.x > b.pos.x &&
    a.pos.x < b.pos.x + b.size.x &&
    a.pos.y + a.size.y > b.pos.y &&
    a.pos.y < b.pos.y + b.size.y
  );
}
