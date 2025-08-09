import { overlap } from "../utils/physics";
import type { Actor, Keys } from "./Actor";
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

  update(time: number, keys: Keys) {
    // 1. Update all actors, get array of updated actors
    let actors = this.actors.map((actor) => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    // 2a. The game is over!
    if (newState.status !== "playing") return newState;

    // 2b. Did player just lose?
    let player = newState.player;
    if (this.level.touches(player.pos, player.size, "lava")) {
      return new State(this.level, actors, "lost");
    }

    // 3. Is player about to collide with another actor?
    for (let actor of actors) {
      if (actor !== player && overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }

    return newState;
  }
}
