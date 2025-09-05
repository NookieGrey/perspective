import {GlobalStorage} from './defaultSettings.js';
import {wireSettingsFormTo} from "./form.js";
import {addPolyfillCanvasClear} from "./addPolyfillCanvasClear.js";
import {drawFloor} from "./examples/floor.js";
import {makePoint} from "./library/point/makePoint.js";
import {drawTunnel} from "./examples/tunnel.js";
import {drawCube} from "./examples/cube.js";

addPolyfillCanvasClear();

const canvas = document.getElementById('canvas');
canvas.width = GlobalStorage.canvasWidth;
canvas.height = GlobalStorage.canvasHeight;

const ctx = canvas.getContext("2d");

wireSettingsFormTo(canvas);
window.Point = makePoint;

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

  drawTunnel(time, ctx);

  drawCube(time, ctx);

  if (GlobalStorage.customDraw) {
    try {
      GlobalStorage.customDraw(time, ctx);
    } catch (e) {
      console.error("Error executing custom code:", e);
    }
  }
}
