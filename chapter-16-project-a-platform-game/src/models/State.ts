import type { Actor } from "./Actor";
import { Level } from "./Level";
import type { Player } from "./Player";

type Status = "playing" | "won" | "lost";

export class State {
  level: Level;
  actors: Actor[];
  status: Status;

  constructor(level: Level, actors: Actor[], status: Status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level: Level) {
    return new State(level, level.startActors, "playing");
  }

  get player() {
    return this.actors.find((a) => a.type === "player") as Player;
  }
}
