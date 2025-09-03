import {GlobalStorage} from '../defaultSettings.js';

Point.distanceY = function (distance) {
  const OD_ = distance + GlobalStorage.pd;

  return GlobalStorage.DD_ / OD_ * distance;
};

Point.distanceX = function (distance, distanceY) {
  /**
  * Constants.DD_ / (Constants.DD_ - distanceY) = (distance - Constants.horizonX) / (result - Constants.horizonX)
  * (result - Constants.horizonX) = (distance - Constants.horizonX) / Constants.DD_ * (Constants.DD_ - distanceY)
  * result = Constants.horizonX + (distance - Constants.horizonX) / Constants.DD_ * (Constants.DD_ - distanceY)
  */
  return GlobalStorage.horizonX + (distance - GlobalStorage.horizonX) / GlobalStorage.DD_ * (GlobalStorage.DD_ - distanceY);
};

Point.distanceZ = function (H, distance, distanceX) {
  /** (distance - Constants.horizonX) / (distanceY - Constants.horizonX) = H / result; */
  return H / (distance - GlobalStorage.horizonX) * (distanceX - GlobalStorage.horizonX)
};

export function Point(x, y, z = 0) {
  const Y = Point.distanceY(y);
  const X = Point.distanceX(x, Y);

  const Z = Point.distanceZ(z,x, X);

  this.x = X;
  this.y = Y;
  this.z = z;

  this.X = X;
  this.Y = GlobalStorage.canvasHeight - Y;
  this.Z = GlobalStorage.canvasHeight - Y - Z;
}
