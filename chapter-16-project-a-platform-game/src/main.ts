import { DOMDisplay } from "./models/DOMDisplay";
import { Level } from "./models/Level";
import { State } from "./models/State";
import "./style.css";

let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

let simpleLevel = new Level(simpleLevelPlan);
let display = new DOMDisplay(document.body, simpleLevel);

display.syncState(State.start(simpleLevel));
