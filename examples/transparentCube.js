import {GlobalStorage} from "../defaultSettings.js";
import {Point} from "../library/Point.js";

export function drawTransparentCube(time, ctx) {
  const x = 1000;
  const y = 600;
  const z = 400;
  const size = 200;
  const angle = (time / GlobalStorage.frameCount * 60) % 180;

  drawCubeRectAngle(x, y, z, size, angle);

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
