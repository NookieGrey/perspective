export const GlobalStorage = {
  "frameCount": 300,
  // todo add comment what is pd
  "pd": 800,
  "mostDistanceX": 5,
  "mostDistanceY": 10,
  "scale": 5
}

GlobalStorage.canvasWidth = window.innerWidth;
GlobalStorage.canvasHeight = window.innerHeight;

GlobalStorage.horizonX = 462 ?? GlobalStorage.canvasWidth / 2;
GlobalStorage.horizonY = 558 ?? GlobalStorage.canvasHeight / 2;

GlobalStorage.step = GlobalStorage.canvasWidth / GlobalStorage.scale;

// todo add comment what is _DD
GlobalStorage.DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;

window.GlobalStorage = GlobalStorage;
