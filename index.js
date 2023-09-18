import {Constants} from './defaultSettings.js';
import {Point} from "./Perspective.js";
import {addListeners} from "./form.js";

CanvasRenderingContext2D.prototype.clear =
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }
  };


const canvas = document.createElement('canvas');
canvas.width = Constants.canvasWidth;
canvas.height = Constants.canvasHeight;

const ctx = Constants.ctx = canvas.getContext("2d");

addListeners(canvas);

function draw(time) {
  ctx.clear();

  const maxDistance = Constants.canvasWidth * Constants.mostDistanceX;
  const count = Constants.scale * Constants.mostDistanceX;

  const leftEnd = 0 - (Constants.mostDistanceY - 1) / 2 * Constants.canvasWidth;
  const rightEnd = Constants.canvasWidth + (Constants.mostDistanceY - 1) / 2 * Constants.canvasWidth;

  function getDistance(index) {
    if (index === count) return maxDistance;
    const order = maxDistance * index / count;

    const frame = time % Constants.frameCount;
    const step = (1 - frame / Constants.frameCount) * Constants.step;
    return order + step;
  }

  const Z = -300;

  (function drawHorizonLines() {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    for (let i = 0; i <= count; i++) {
      const distance = getDistance(i);

      const A = new Point(leftEnd, distance, Z);
      const B = new Point(rightEnd, distance, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }
    ctx.stroke();
  })();

  (function drawVerticalLines() {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    for (let c = leftEnd; c <= rightEnd; c += Constants.step) {
      const A = new Point(c, 0, Z);
      const B = new Point(c, Constants.mostDistanceX * Constants.canvasWidth, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }
    ctx.stroke();
  })();

  const x = 1000;
  const y = 600;
  const z = 400;
  const size = 200;

  function drawCubeMatrix(startX = 0, startY = 0, startZ = 0, size = 100,  xCount = 1, yCount = 1, zCount = 1) {
    for (let ix = 0; ix < xCount; ix++) {
      for (let iy = 0; iy < yCount; iy++) {
        for (let iz = 0; iz < zCount; iz++) {
          drawCube(startX + ix * size, startY + iy * size, startZ + iz * size, size);
        }
      }
    }
  }

  // drawCubeMatrix(100,100,100, 200, 3, 3, 3)

  // function getAngle(x, y) {
  //   return 180 / Math.PI * Math.acos(x / y)
  // }
  //
  // function getRelation(angle) {
  //   return Math.cos(Math.PI / 180 * angle)
  // }

  const angle = (time / Constants.frameCount * 60) % 180;

  // 600 frameCount = 10 seconds

  drawCubeRectAngle(x, y, z, size, angle);

  function drawCube(x, y, z, size) {
    const leftDown = new Point(x, y, z);
    const leftTop = new Point(x, y + size, z)
    const rightDown = new Point(x + size, y, z)
    const rightTop = new Point(x + size, y + size, z)

    const leftDownZ = new Point(x, y, z + size);
    const leftTopZ = new Point(x, y + size, z + size)
    const rightDownZ = new Point(x + size, y, z + size)
    const rightTopZ = new Point(x + size, y + size, z + size)

    ctx.beginPath();
    ctx.strokeStyle = 'white';

    ctx.moveTo(leftDown.X, leftDown.Z);

    ctx.lineTo(leftTop.X, leftTop.Z);
    ctx.lineTo(rightTop.X, rightTop.Z);
    ctx.lineTo(rightDown.X, rightDown.Z);
    ctx.lineTo(leftDown.X, leftDown.Z);

    ctx.moveTo(rightTop.X, rightTop.Z);
    ctx.lineTo(rightTopZ.X, rightTopZ.Z);

    ctx.moveTo(rightDown.X, rightDown.Z);
    ctx.lineTo(rightDownZ.X, rightDownZ.Z);

    ctx.moveTo(leftTop.X, leftTop.Z);
    ctx.lineTo(leftTopZ.X, leftTopZ.Z);

    ctx.moveTo(leftDown.X, leftDown.Z);
    ctx.lineTo(leftDownZ.X, leftDownZ.Z);

    ctx.moveTo(leftDownZ.X, leftDownZ.Z);

    ctx.lineTo(leftTopZ.X, leftTopZ.Z);
    ctx.lineTo(rightTopZ.X, rightTopZ.Z);
    ctx.lineTo(rightDownZ.X, rightDownZ.Z);
    ctx.lineTo(leftDownZ.X, leftDownZ.Z);

    ctx.stroke();


  }

  function drawCubeAngle(x, y, z, size, angle) {
    // sin(a/2) = hipoDiff / (1√2*size)
    const sinus = Math.sin(Math.PI / 180 * angle / 2);
    const hipoDiff = (Math.sqrt(2) * size) * sinus;

    const smallAngle = (180 - angle) / 2 - 45;

    const xDiff = Math.cos(Math.PI / 180 * smallAngle) * hipoDiff;
    const yDiff = Math.sin(Math.PI / 180 * smallAngle) * hipoDiff;

    const halfSize = size / 2;

    const centerX = x + halfSize;
    const centerY = y + halfSize;
    const centerZ = z + halfSize;

    const leftDown = new Point(centerX - halfSize - yDiff, centerY - halfSize + xDiff, centerZ - halfSize);
    const leftTop = new Point(centerX - halfSize + xDiff, centerY + halfSize + yDiff, centerZ - halfSize);
    const rightTop = new Point(centerX + halfSize + yDiff, centerY + halfSize - xDiff, centerZ - halfSize);
    const rightDown = new Point(centerX + halfSize - xDiff, centerY - halfSize - yDiff, centerZ - halfSize);

    const leftDownZ = new Point(centerX - halfSize - yDiff, centerY - halfSize + xDiff, centerZ + halfSize);
    const leftTopZ = new Point(centerX - halfSize + xDiff, centerY + halfSize + yDiff, centerZ + halfSize);
    const rightTopZ = new Point(centerX + halfSize + yDiff, centerY + halfSize - xDiff, centerZ + halfSize);
    const rightDownZ = new Point(centerX + halfSize - xDiff, centerY - halfSize - yDiff, centerZ + halfSize);

    ctx.beginPath();
    ctx.strokeStyle = 'white';

    ctx.moveTo(leftDown.X, leftDown.Z);

    ctx.lineTo(leftTop.X, leftTop.Z);
    ctx.lineTo(rightTop.X, rightTop.Z);
    ctx.lineTo(rightDown.X, rightDown.Z);
    ctx.lineTo(leftDown.X, leftDown.Z);

    ctx.moveTo(rightTop.X, rightTop.Z);
    ctx.lineTo(rightTopZ.X, rightTopZ.Z);

    ctx.moveTo(rightDown.X, rightDown.Z);
    ctx.lineTo(rightDownZ.X, rightDownZ.Z);

    ctx.moveTo(leftTop.X, leftTop.Z);
    ctx.lineTo(leftTopZ.X, leftTopZ.Z);

    ctx.moveTo(leftDown.X, leftDown.Z);
    ctx.lineTo(leftDownZ.X, leftDownZ.Z);

    ctx.moveTo(leftDownZ.X, leftDownZ.Z);

    ctx.lineTo(leftTopZ.X, leftTopZ.Z);
    ctx.lineTo(rightTopZ.X, rightTopZ.Z);
    ctx.lineTo(rightDownZ.X, rightDownZ.Z);
    ctx.lineTo(leftDownZ.X, leftDownZ.Z);

    ctx.stroke();
  }
  function drawCubeRectAngle(x, y, z, size, angle) {
    // sin(a/2) = hipoDiff / (1√2*size)
    const sinus = Math.sin(Math.PI / 180 * angle / 2);
    const hipoDiff = (Math.sqrt(2) * size) * sinus;

    const smallAngle = (180 - angle) / 2 - 45;

    const xDiff = Math.cos(Math.PI / 180 * smallAngle) * hipoDiff;
    const yDiff = Math.sin(Math.PI / 180 * smallAngle) * hipoDiff;

    const halfSize = size / 2;

    const centerX = x + halfSize;
    const centerY = y + halfSize;
    const centerZ = z + halfSize;

    const leftDown = new Point(centerX - halfSize - yDiff, centerY - halfSize + xDiff, centerZ - halfSize);
    const leftTop = new Point(centerX - halfSize + xDiff, centerY + halfSize + yDiff, centerZ - halfSize);
    const rightTop = new Point(centerX + halfSize + yDiff, centerY + halfSize - xDiff, centerZ - halfSize);
    const rightDown = new Point(centerX + halfSize - xDiff, centerY - halfSize - yDiff, centerZ - halfSize);

    const leftDownZ = new Point(centerX - halfSize - yDiff, centerY - halfSize + xDiff, centerZ + halfSize);
    const leftTopZ = new Point(centerX - halfSize + xDiff, centerY + halfSize + yDiff, centerZ + halfSize);
    const rightTopZ = new Point(centerX + halfSize + yDiff, centerY + halfSize - xDiff, centerZ + halfSize);
    const rightDownZ = new Point(centerX + halfSize - xDiff, centerY - halfSize - yDiff, centerZ + halfSize);

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'gold';

    ctx.moveTo(leftDown.X, leftDown.Z);

    ctx.lineTo(leftTop.X, leftTop.Z);
    ctx.lineTo(rightTop.X, rightTop.Z);
    ctx.lineTo(rightDown.X, rightDown.Z);
    ctx.lineTo(leftDown.X, leftDown.Z);
    ctx.fill();


    ctx.moveTo(rightTop.X, rightTop.Z);
    ctx.lineTo(rightTopZ.X, rightTopZ.Z);

    ctx.moveTo(rightDown.X, rightDown.Z);
    ctx.lineTo(rightDownZ.X, rightDownZ.Z);

    ctx.moveTo(leftTop.X, leftTop.Z);
    ctx.lineTo(leftTopZ.X, leftTopZ.Z);

    ctx.moveTo(leftDown.X, leftDown.Z);
    ctx.lineTo(leftDownZ.X, leftDownZ.Z);

    ctx.moveTo(leftDownZ.X, leftDownZ.Z);

    ctx.lineTo(leftTopZ.X, leftTopZ.Z);
    ctx.lineTo(rightTopZ.X, rightTopZ.Z);
    ctx.lineTo(rightDownZ.X, rightDownZ.Z);
    ctx.lineTo(leftDownZ.X, leftDownZ.Z);

    ctx.stroke();
  }
}

requestAnimationFrame = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

// draw(0);

let stop = false;
let time = 0;
loop();

function loop() {
  if (!stop) {
    time++;
    draw(time);
  }

  requestAnimationFrame(loop);
}

//document.body.addEventListener('click', function () {
//    stop = !stop;
//});