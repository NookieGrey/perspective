import {GlobalStorage} from "../defaultSettings.js";
import {makePoint} from "../library/point/makePoint.js";

export function drawFloor(time, ctx) {
  if (!GlobalStorage.examples.floor.showFloor) return;

  const maxDistance = GlobalStorage.canvasWidth * GlobalStorage.mostDistanceX;
  const count = GlobalStorage.scale * GlobalStorage.mostDistanceX;

  const leftEnd = 0 - (GlobalStorage.mostDistanceY - 1) / 2 * GlobalStorage.canvasWidth;
  const rightEnd = GlobalStorage.canvasWidth + (GlobalStorage.mostDistanceY - 1) / 2 * GlobalStorage.canvasWidth;

  const maxDistanceY = GlobalStorage.canvasWidth * GlobalStorage.mostDistanceY;
  const countY = GlobalStorage.scale * GlobalStorage.mostDistanceY;

  function getDistance(index) {
    if (index === count) return maxDistance;
    const order = maxDistance * index / count;

    if (GlobalStorage.examples.floor.speedX === 0) {
      return order;
    }
    const framesCount = GlobalStorage.frameCount / GlobalStorage.examples.floor.speedX;

    const frame = time % framesCount;
    const step = (1 - frame / framesCount) * GlobalStorage.step;
    return order + step;
  }

  function getDistanceY(index) {
    if (index === countY) return maxDistanceY;
    const order = maxDistanceY * index / countY;

    if (GlobalStorage.examples.floor.speedY === 0) {
      return order;
    }
    const framesCount = GlobalStorage.frameCount / GlobalStorage.examples.floor.speedY;

    const frame = time % framesCount;
    const step = (1 - frame / framesCount) * GlobalStorage.step;
    return order + step;
  }

  /** The default Z is negative because our viewpoint is elevated, not at ground level. */
  const Z = -GlobalStorage.examples.floor.height;
  // const Z = 0;

  (function drawHorizonLines() {
    ctx.beginPath();
    ctx.strokeStyle = 'white';

    {
      const A = makePoint(leftEnd, 0, Z);
      const B = makePoint(rightEnd, 0, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }

    for (let i = 0; i <= count; i++) {
      const distance = getDistance(i);

      const A = makePoint(leftEnd, distance, Z);
      const B = makePoint(rightEnd, distance, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }
    ctx.stroke();
  })();

  (function drawVerticalLines() {
    ctx.beginPath();
    ctx.strokeStyle = 'white';

    {
      const A = makePoint(leftEnd, 0, Z);
      const B = makePoint(leftEnd, GlobalStorage.mostDistanceX * GlobalStorage.canvasWidth, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }

    {
      const A = makePoint(rightEnd, 0, Z);
      const B = makePoint(rightEnd, GlobalStorage.mostDistanceX * GlobalStorage.canvasWidth, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }

    for (let c = leftEnd; c <= rightEnd - GlobalStorage.step; c += GlobalStorage.step) {
      const distance = getDistanceY(c / GlobalStorage.step);

      const A = makePoint(distance, 0, Z);
      const B = makePoint(distance, GlobalStorage.mostDistanceX * GlobalStorage.canvasWidth, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }
    ctx.stroke();
  })();
}
