const availableWidth = window.innerWidth - 300;

export const GlobalStorage = {
  pd: 300,
  canvasWidth: availableWidth,
  canvasHeight: window.innerHeight,
  mostDistanceX: 3,
  mostDistanceY: 9,
  scale: 5,
  horizonX: Math.round(availableWidth / 2 * 0.7),
  horizonY: Math.round(window.innerHeight / 2 * 0.8),
  DD_: 300,
  step: 80,
  frameCount: 300,
  customDraw: null,
  examples: {
    floor: {
      showFloor: true,
      height: 0,
      speedX: 2,
      speedY: 0
    },
    tunnel: {
      showTunnel: true,
      height: 0,
      speedX: 2,
      radius: Math.round(Math.min(availableWidth, window.innerHeight) * 0.4),
      verticalEndpointOffset: -450
    },
    cube: {
      showCube: false,
      size: 300,
    }
  }
};

// 2. Устанавливаем вертикальное смещение концов дуги относительно ее центра.
// Это значение (radius * Math.sin(angle)) теперь является основной константой.
// Отрицательное значение смещает концы дуги вниз от центра.
// Чтобы сохранить исходную геометрию, мы можем вычислить его из первоначального угла.
// const verticalEndpointOffset = radius * Math.sin(-Math.PI / 5);
const tunnelWidthOnScreen = GlobalStorage.canvasWidth / GlobalStorage.scale;
const halfTunnelWidth = tunnelWidthOnScreen / 2;

// Рассчитываем verticalEndpointOffset, чтобы основание туннеля соответствовало заданной ширине.
// Используем теорему Пифагора: radius^2 = halfTunnelWidth^2 + verticalEndpointOffset^2
GlobalStorage.examples.tunnel.verticalEndpointOffset = -Math.round(Math.sqrt(GlobalStorage.examples.tunnel.radius * GlobalStorage.examples.tunnel.radius - halfTunnelWidth * halfTunnelWidth));


GlobalStorage.DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;
GlobalStorage.step = GlobalStorage.canvasWidth / GlobalStorage.scale;
