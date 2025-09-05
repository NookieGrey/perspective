import {GlobalStorage} from "../defaultSettings.js";
import {makePoint} from "../library/point";

export function drawTransparentCube(time, ctx) {
  const size = 200;
  const x = GlobalStorage.canvasWidth / 2 - size / 2;
  const z = 200;

  const y = calculateY(time)

  // todo added 0.5, because need to fix 45 deg
  const angle = (time / GlobalStorage.frameCount * 60) % 360 + 0.5;

  drawCubeRectAngle(x, y, z, size, angle);

  function calculateY(time) {
    const maxDistance = GlobalStorage.canvasWidth * GlobalStorage.mostDistanceX;

    const framesCount = GlobalStorage.frameCount / GlobalStorage.examples.floor.speedX;

    return maxDistance * (1 - (time % framesCount) / framesCount);
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

    const leftDown = makePoint(centerX - halfSize - yDiff, centerY - halfSize + xDiff, centerZ - halfSize);
    const leftTop = makePoint(centerX - halfSize + xDiff, centerY + halfSize + yDiff, centerZ - halfSize);
    const rightTop = makePoint(centerX + halfSize + yDiff, centerY + halfSize - xDiff, centerZ - halfSize);
    const rightDown = makePoint(centerX + halfSize - xDiff, centerY - halfSize - yDiff, centerZ - halfSize);

    const leftDownZ = makePoint(centerX - halfSize - yDiff, centerY - halfSize + xDiff, centerZ + halfSize);
    const leftTopZ = makePoint(centerX - halfSize + xDiff, centerY + halfSize + yDiff, centerZ + halfSize);
    const rightTopZ = makePoint(centerX + halfSize + yDiff, centerY + halfSize - xDiff, centerZ + halfSize);
    const rightDownZ = makePoint(centerX + halfSize - xDiff, centerY - halfSize - yDiff, centerZ + halfSize);

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
}
