import {GlobalStorage} from './defaultSettings.js';
import {wireSettingsFormTo} from "./form.js";
import {addPolyfillCanvasClear} from "./addPolyfillCanvasClear.js";
import {drawFloor} from "./examples/floor.js";
import {drawCube} from "./examples/cube.js";

addPolyfillCanvasClear();

const canvas = document.createElement('canvas');
canvas.width = GlobalStorage.canvasWidth;
canvas.height = GlobalStorage.canvasHeight;

const ctx = canvas.getContext("2d");

wireSettingsFormTo(canvas);

let stop = false;
let time = 0;
loop(ctx);

function loop(ctx) {
  if (!stop) {
    time++;
    draw(time, ctx);
  }

  requestAnimationFrame(() => loop(ctx));
}

function draw(time, ctx) {
  ctx.clear();

  drawFloor(time, ctx);
  drawCube(time, ctx);
}
