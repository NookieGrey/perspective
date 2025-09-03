import {GlobalStorage} from "../defaultSettings.js";
import {Point} from "../library/Point.js";

export function drawCube(time, ctx) {
  if (!GlobalStorage.examples.cube.showCube) return;

  const {x, y, z} = move(time, 200, 500, 300);
  // const x = 600, y = 500, z = 300;

  const size = GlobalStorage.examples.cube.size;
  // todo added 0.5, because need to fix 45 deg
  const angle = (time / GlobalStorage.frameCount * 60) % 360 + 0.5;
  // const angle = 45;

  const pointBottom = new Point(x, y, z);
  const showBottom = pointBottom.Z < GlobalStorage.horizonY;

  const pointTop = new Point(x, y, z + size);
  const showTop = pointTop.Z > GlobalStorage.horizonY;

  const pointLeft = new Point(x, y, z);
  const showLeft = pointLeft.X > GlobalStorage.horizonX;

  const pointRight = new Point(x + size, y, z);
  const showRight = pointRight.X < GlobalStorage.horizonX;

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

    let angleDiff = -50;

    if (showLeft) {
      angleDiff = -50;
    }

    if (showRight) {
      angleDiff = -70;
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

function move(time, startX, startY, startZ) {
  const range = 600; // Дистанция движения по каждой оси
  const period_per_axis = range;
  const total_period = period_per_axis * 6; // Общая длительность полного цикла
  const phase_time = time % total_period;

  const current_phase = Math.floor(phase_time / period_per_axis); // Определяем текущую фазу (0-5)
  const progress = phase_time % period_per_axis; // Прогресс внутри текущей фазы

  const endX = startX + range - 1;
  const endY = startY + range - 1;
  const endZ = startZ + range - 1;

  let x, y, z;

  switch (current_phase) {
    case 0: // Движение по X вперед
      x = startX + progress;
      y = startY;
      z = startZ;
      break;
    case 1: // Движение по Y вперед
      x = endX;
      y = startY + progress;
      z = startZ;
      break;
    case 2: // Движение по Z вперед
      x = endX;
      y = endY;
      z = startZ + progress;
      break;
    case 3: // Движение по Z назад
      x = endX;
      y = endY;
      z = endZ - progress;
      break;
    case 4: // Движение по Y назад
      x = endX;
      y = endY - progress;
      z = startZ;
      break;
    case 5: // Движение по X назад
      x = endX - progress;
      y = startY;
      z = startZ;
      break;
  }

  return {x, y, z};
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


