import type { Actor } from "./Actor";
import { Coin } from "./Coin";
import { Lava } from "./Lava";
import { Player } from "./Player";
import { Vec } from "./Vec";

const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
} as const;

export class Level {
  height: number;
  width: number;
  rows: string[][];
  startActors: Actor[];

  constructor(plan: string) {
    let rows = plan
      .trim()
      .split("\n")
      .map((l) => [...l]);

    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) =>
      row.map((ch, x) => {
        let type = levelChars[ch as keyof typeof levelChars];
        if (typeof type !== "string") {
          let pos = new Vec(x, y);
          this.startActors.push(type.create(pos, ch));
          type = "empty";
        }
        return type;
      })
    );
  }
}
