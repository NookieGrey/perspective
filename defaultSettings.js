export const GlobalStorage = {
  "frameCount": 300,
  // todo add comment what is pd
  "pd": 800,
  "mostDistanceX": 5,
  "mostDistanceY": 10,
  "scale": 5,
}

GlobalStorage.canvasWidth = window.innerWidth;
GlobalStorage.canvasHeight = window.innerHeight;

GlobalStorage.horizonX = 800 ?? GlobalStorage.canvasWidth / 2;
GlobalStorage.horizonY = 200 ?? GlobalStorage.canvasHeight / 2;

GlobalStorage.step = GlobalStorage.canvasWidth / GlobalStorage.scale;

// todo add comment what is _DD
GlobalStorage.DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;

GlobalStorage.examples = {
  floor: {
    showFloor: true,
    height: 1000,
    speedX: 3,
    speedY: 3,
  },
  cube: {
    showCube: true,
    size: 200,
  }
}

GlobalStorage.customDraw = new Function('time', 'ctx', "");

window.GlobalStorage = GlobalStorage;
