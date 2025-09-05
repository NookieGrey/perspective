import {makePoint} from "../library/point/makePoint.js";
import {GlobalStorage} from "../defaultSettings.js";

/**
 * Рисует дугу в перспективе, расположенную перпендикулярно земле.
 * @param {CanvasRenderingContext2D} ctx - Контекст 2D для рисования.
 * @param {number} centerX - Горизонтальная координата X центра дуги.
 * @param {number} centerY - Координата Y (глубина), на которой находится вся дуга.
 * @param {number} centerZ - Координата Z (высота) центра дуги.
 * @param {number} radius - Радиус дуги в 3D.
 * @param {number} startAngle - Начальный угол дуги в радианах (e.g., 0).
 * @param {number} endAngle - Конечный угол дуги в радианах (e.g., Math.PI для полукруга).
 */
function drawPerspectiveArc(ctx, centerX, centerY, centerZ, radius, startAngle, endAngle) {
  // Проецируем 3D-центр в 2D-координаты экрана
  const centerScreenPoint = makePoint(centerX, centerY, centerZ);

  // Рассчитываем масштаб перспективы для данной глубины (centerY)
  const scale = GlobalStorage.pd / (GlobalStorage.pd + centerY);

  // Радиус на экране — это 3D-радиус, умноженный на коэффициент масштабирования
  const screenRadius = radius * scale;

  ctx.beginPath();

  // Поскольку ось Y холста инвертирована по сравнению с нашей 3D-осью Z,
  // мы должны инвертировать углы и поменять их местами, чтобы сохранить
  // направление отрисовки дуги (против часовой стрелки для верхней части).
  ctx.arc(
    centerScreenPoint.X,
    centerScreenPoint.Z,
    screenRadius,
    -endAngle, // Меняем местами и инвертируем
    -startAngle // Меняем местами и инвертируем
  );

  ctx.stroke();
}

export function drawTunnel(time, ctx) {
  if (!GlobalStorage.examples.tunnel.showTunnel) {
    return;
  }
  const numArcs = GlobalStorage.mostDistanceX * GlobalStorage.scale;
  const startY = 0;
  const arcSpacing = GlobalStorage.step;

  function getDistance(index) {
    const order = startY + index * arcSpacing;

    if (GlobalStorage.examples.tunnel.speedX === 0) {
      return order;
    }
    const framesCount = GlobalStorage.frameCount / GlobalStorage.examples.tunnel.speedX;

    const frame = time % framesCount;
    const step = (1 - frame / framesCount) * arcSpacing;
    return order + step;
  }

  const canvasWidth = GlobalStorage.canvasWidth;
  const centerX = canvasWidth / 2;
  const radius = GlobalStorage.examples.tunnel.radius;

  // 1. Задаем желаемый уровень "земли" для концов арки.
  const arcGroundLevel = -GlobalStorage.examples.tunnel.height;

  // 2. Устанавливаем вертикальное смещение концов дуги относительно ее центра.
  // Это значение (radius * Math.sin(angle)) теперь является основной константой.
  // Отрицательное значение смещает концы дуги вниз от центра.
  // Чтобы сохранить исходную геометрию, мы можем вычислить его из первоначального угла.
  // const verticalEndpointOffset = radius * Math.sin(-Math.PI / 5);
  const verticalEndpointOffset = GlobalStorage.examples.tunnel.verticalEndpointOffset;

  // 3. Вычисляем начальный и конечный углы на основе этого смещения.
  const baseAngle = Math.asin(verticalEndpointOffset / radius);

  // startAngle будет справа (в 4-м квадранте), а endAngle слева (в 3-м квадранте),
  // образуя дугу, проходящую сверху.
  const startAngle = baseAngle;
  const endAngle = Math.PI - baseAngle;

  // 4. Вычисляем centerZ так, чтобы концы арки находились на заданном уровне "земли".
  const calculatedCenterZ = arcGroundLevel - verticalEndpointOffset;

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;

  // Рисуем дугу в начале "пола"
  drawPerspectiveArc(
    ctx,
    centerX,
    0,
    calculatedCenterZ, // Используем вычисленное значение
    radius,
    startAngle,
    endAngle
  );

  // Вычисляем Y-координату для конца "пола"
  const endOfFloorCenterY = GlobalStorage.canvasWidth * GlobalStorage.mostDistanceX;

  // Рисуем дугу в конце "пола"
  drawPerspectiveArc(
    ctx,
    centerX,
    endOfFloorCenterY, // Используем вычисленное значение для centerY
    calculatedCenterZ,
    radius,
    startAngle,
    endAngle
  );

  // Рисуем все арки в цикле, включая начальную и конечную
  for (let i = 0; i < numArcs; i++) {
    const currentCenterY = getDistance(i);
    drawPerspectiveArc(
      ctx,
      centerX,
      currentCenterY,
      calculatedCenterZ, // Используем вычисленное значение
      radius,
      startAngle,
      endAngle
    );
  }

  // Рисуем продольные линии у основания тоннеля
  {
    const lineStartY = 0;
    // Конечная Y-координата должна совпадать с концом пола
    const lineEndY = GlobalStorage.mostDistanceX * GlobalStorage.canvasWidth;

    // Координаты X и Z для начальной точки дуги (startAngle)
    const x_start = centerX + radius * Math.cos(startAngle);
    const z_start = calculatedCenterZ + radius * Math.sin(startAngle);

    // Координаты X и Z для конечной точки дуги (endAngle)
    const x_end = centerX + radius * Math.cos(endAngle);
    const z_end = calculatedCenterZ + radius * Math.sin(endAngle);

    // Создаем точки в 3D пространстве для левой линии
    const A_start = makePoint(x_start, lineStartY, z_start);
    const B_start = makePoint(x_start, lineEndY, z_start);

    // Создаем точки в 3D пространстве для правой линии
    const A_end = makePoint(x_end, lineStartY, z_end);
    const B_end = makePoint(x_end, lineEndY, z_end);

    ctx.beginPath();
    // Рисуем левую продольную линию
    ctx.moveTo(A_start.X, A_start.Z);
    ctx.lineTo(B_start.X, B_start.Z);

    // Рисуем правую продольную линию
    ctx.moveTo(A_end.X, A_end.Z);
    ctx.lineTo(B_end.X, B_end.Z);

    ctx.stroke();
  }
}
