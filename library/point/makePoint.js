import {GlobalStorage} from '../../defaultSettings.js';


function distanceY(distance) {
  const OD_ = distance + GlobalStorage.pd;
  const DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;

  return DD_ / OD_ * distance;
}


function distanceX(distance, distanceY) {
  const DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;
  const s = (DD_ - distanceY) / DD_;
  return GlobalStorage.horizonX + (distance - GlobalStorage.horizonX) * s;
}

function distanceZ(H, distanceY) {
  const DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;
  const s = (DD_ - distanceY) / DD_;
  return H * s;
}

export function makePoint(x, y, z = 0) {
  // Transform the original coordinates (x, y, z) into projected coordinates (X, Y, Z)
  // using the distance projection functions.
  // The Y coordinate is projected first, then X is projected relative to the horizonX and projected Y.
  // The Z depth is calculated to represent vertical height in the projection.
  // The inversion 'canvasHeight - Y' converts the coordinate system from mathematical (origin at bottom-left)
  // to screen coordinates (origin at top-left), so the point is correctly positioned on the canvas.
  const Y = distanceY(y);
  const X = distanceX(x, Y);
  const Z = distanceZ(z, Y);

  return {
    X,
    // Y: GlobalStorage.canvasHeight - Y,
    Z: GlobalStorage.canvasHeight - Y - Z,
  }
}
