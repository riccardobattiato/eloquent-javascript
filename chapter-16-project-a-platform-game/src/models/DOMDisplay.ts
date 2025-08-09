import { drawActors, drawGrid, elt, scale } from "../utils/dom";
import type { Level } from "./Level";
import type { State } from "./State";

export class DOMDisplay {
  dom: HTMLElement;
  actorLayer: HTMLElement | null;

  constructor(parent: HTMLElement, level: Level) {
    this.dom = elt("div", { class: "game" }, drawGrid(level));
    this.actorLayer = null;

    parent.appendChild(this.dom);
  }

  syncState(state: State) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  }

  scrollPlayerIntoView(state: State) {
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width / 3;

    // The viewport
    let left = this.dom.scrollLeft,
      right = left + width;
    let top = this.dom.scrollTop,
      bottom = top + height;

    let player = state.player;

    if (!player) {
      throw new Error("Cannot find player in game status");
    }

    let center = player.pos.plus(player.size.times(0.5)).times(scale);

    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  }

  clear() {
    this.dom.remove();
  }
}
