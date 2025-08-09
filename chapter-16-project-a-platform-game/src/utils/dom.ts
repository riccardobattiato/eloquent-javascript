// The following helper function provides a succinct way to create an element
// and give it some attributes and child nodes

import type { Actor } from "../models/Actor";
import type { Level } from "../models/Level";

export const scale = 20;

export function elt(
  name: string,
  attrs: Record<string, string>,
  ...children: HTMLElement[]
) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

export function drawGrid(level: Level) {
  return elt(
    "table",
    {
      class: "background",
      style: `width: ${level.width * scale}px`,
    },
    ...level.rows.map((row) =>
      elt(
        "tr",
        { style: `height: ${scale}px` },
        ...row.map((type) => elt("td", { class: type }))
      )
    )
  );
}

export function drawActors(actors: Actor[]) {
  return elt(
    "div",
    {},
    ...actors.map((actor) => {
      console.log("NOW ACTOR", actor, actor.type, actor.size);
      let rect = elt("div", { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;

      return rect;
    })
  );
}
