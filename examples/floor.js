import {GlobalStorage} from "../defaultSettings.js";
import {Point} from "../library/Point.js";

export function drawFloor(time, ctx) {
  const maxDistance = GlobalStorage.canvasWidth * GlobalStorage.mostDistanceX;
  const count = GlobalStorage.scale * GlobalStorage.mostDistanceX;

  const leftEnd = 0 - (GlobalStorage.mostDistanceY - 1) / 2 * GlobalStorage.canvasWidth;
  const rightEnd = GlobalStorage.canvasWidth + (GlobalStorage.mostDistanceY - 1) / 2 * GlobalStorage.canvasWidth;

  const maxDistanceY = GlobalStorage.canvasWidth * GlobalStorage.mostDistanceY;
  const countY = GlobalStorage.scale * GlobalStorage.mostDistanceY;

  function getDistance(index) {
    if (index === count) return maxDistance;
    const order = maxDistance * index / count;
    /** accelerate by X */
    // const framesCount = GlobalStorage.frameCount / 5;
    const framesCount = GlobalStorage.frameCount;

    const frame = time % framesCount;
    const step = (1 - frame / framesCount) * GlobalStorage.step;
    return order + step;
  }

  function getDistanceY(index) {
    if (index === countY) return maxDistanceY;
    const order = maxDistanceY * index / countY;
    /** accelerate by Y */
    // const framesCount = GlobalStorage.frameCount / 5;
    const framesCount = GlobalStorage.frameCount;

    const frame = time % framesCount;
    const step = (1 - frame / framesCount) * GlobalStorage.step;
    return order + step;
  }

  /** The default Z is negative because our viewpoint is elevated, not at ground level. */
  const Z = -300;
  // const Z = 0;

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

    {
      const A = new Point(leftEnd, 0, Z);
      const B = new Point(leftEnd, GlobalStorage.mostDistanceX * GlobalStorage.canvasWidth, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }

    {
      const A = new Point(rightEnd, 0, Z);
      const B = new Point(rightEnd, GlobalStorage.mostDistanceX * GlobalStorage.canvasWidth, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }

    for (let c = leftEnd; c <= rightEnd - GlobalStorage.step; c += GlobalStorage.step) {
      const distance = getDistanceY(c / GlobalStorage.step);

      const A = new Point(distance, 0, Z);
      const B = new Point(distance, GlobalStorage.mostDistanceX * GlobalStorage.canvasWidth, Z);
      ctx.moveTo(A.X, A.Z);
      ctx.lineTo(B.X, B.Z);
    }
    ctx.stroke();
  })();
}
