export const Constants = {
  "frameCount": 300,
  "pd": 800,
  "mostDistanceX": 5,
  "mostDistanceY": 2,
  "scale": 5
}

Constants.canvasWidth = window.innerWidth;
Constants.canvasHeight = window.innerHeight;

Constants.horizonX = 800 || Constants.canvasWidth / 2;
Constants.horizonY = 200 || Constants.canvasHeight / 2;

Constants.step = Constants.canvasWidth / Constants.scale;

Constants.DD_ = Constants.canvasHeight - Constants.horizonY;
