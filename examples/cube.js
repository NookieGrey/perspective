import {GlobalStorage} from "../defaultSettings.js";
import {makePoint} from "../library/point";

export function drawCube(time, ctx) {
  if (!GlobalStorage.examples.cube.showCube) return;

  const x = 600;
  const z = 200;
  const y = 100;

  const size = GlobalStorage.examples.cube.size;
  // todo added 0.5, because need to fix 45 deg
  // const angle = 45;

  const pointBottom = makePoint(x, y, z);
  const showBottom = pointBottom.Z < GlobalStorage.horizonY;

  const pointTop = makePoint(x, y, z + size);
  const showTop = pointTop.Z > GlobalStorage.horizonY;

  const pointLeft = makePoint(x, y, z);
  const showLeft = pointLeft.X > GlobalStorage.horizonX;

  const pointRight = makePoint(x + size, y, z);
  const showRight = pointRight.X < GlobalStorage.horizonX;

  const maxDistance = GlobalStorage.canvasWidth * GlobalStorage.mostDistanceX;
  const count = GlobalStorage.scale * GlobalStorage.mostDistanceX / 3;

  function getDistance(index) {
    if (index === count) return maxDistance;
    const order = maxDistance * index / count;

    if (GlobalStorage.examples.floor.speedX === 0) {
      return order;
    }
    const framesCount = GlobalStorage.frameCount / GlobalStorage.examples.floor.speedX;

    const frame = time % framesCount;
    const step = (1 - frame / framesCount) * GlobalStorage.step * 3;
    return order + step;
  }

  const angle = (time / GlobalStorage.frameCount * 60) % 360 + 0.5;

  for (let i = count; i >= 0; i--) {
    const distance = getDistance(i);

    drawCubeRectAngle(x, distance, z, size, angle);
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

    let angleDiff = -50;

    if (showLeft) {
      angleDiff = -50;
    }

    if (showRight) {
      angleDiff = -90;
    }

    if ((angle > angleDiff && angle <= 90 + angleDiff) || angle > 360 + angleDiff) {
      drawRight('cornflowerBlue');
      drawLeft('mediumSeaGreen');
      drawFront('aquamarine');
    } else if (angle > 90 + angleDiff && angle <= 180 + angleDiff) {
      drawBack('coral');
      drawFront('aquamarine');
      drawRight('cornflowerBlue');
    } else if (angle > 180 + angleDiff && angle <= 270 + angleDiff) {
      drawLeft('mediumSeaGreen');
      drawRight('cornflowerBlue');
      drawBack('coral');
    } else {
      drawFront('aquamarine');
      drawBack('coral');
      drawLeft('mediumSeaGreen');
    }

    if (showBottom) {
      const color = 'gold';
      fillTriangle(ctx, leftDown, leftTop, rightTop, color);
      fillTriangle(ctx, leftDown, rightTop, rightDown, color);
    }

    if (showTop) {
      const color = 'mediumPurple';
      fillTriangle(ctx, leftTopZ, rightTopZ, rightDownZ, color);
      fillTriangle(ctx, leftTopZ, rightDownZ, leftDownZ, color);
    }

    function drawLeft(color) {
      if (1 === 1 || angle >= 170 || angle <= 10) {
        fillTriangle(ctx, leftDown, leftTop, leftTopZ, color);
        fillTriangle(ctx, leftDown, leftTopZ, leftDownZ, color);
      }
    }

    function drawFront(color) {
      if (1 === 1 || angle <= 100 || angle >= 270) {
        fillTriangle(ctx, rightDown, leftDown, leftDownZ, color);
        fillTriangle(ctx, rightDown, leftDownZ, rightDownZ, color);
      }
    }

    function drawRight(color) {
      if (1 === 1 || (angle >= 0 && angle < 190) || angle >= 350) {
        fillTriangle(ctx, rightTop, rightTopZ, rightDownZ, color);
        fillTriangle(ctx, rightTop, rightDownZ, rightDown, color);
      }
    }

    function drawBack(color) {
      if (1 === 1 || angle >= 60 && angle <= 300) {
        fillTriangle(ctx, leftTop, rightTop, rightTopZ, color);
        fillTriangle(ctx, leftTop, rightTopZ, leftTopZ, color);
      }
    }
  }

}

// Вспомогательная функция для отрисовки треугольника по 3 точкам
function fillTriangle(ctx, p1, p2, p3, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(p1.X, p1.Z);
  ctx.lineTo(p2.X, p2.Z);
  ctx.lineTo(p3.X, p3.Z);
  ctx.closePath();
  ctx.fill();
}


