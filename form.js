import {GlobalStorage} from "./defaultSettings.js";

export function wireSettingsFormTo(canvas) {
  var form;

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;

    body.appendChild(canvas);

    {
      form = document.getElementById('settings');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
      });

      var $pd = form.pd;
      $pd.value = GlobalStorage.pd;
      $pd.addEventListener('change', function () {
        var value = +this.value;
        if (value > 0) {
          GlobalStorage.pd = value;
        }
      });

      var $frameCount = form['frame-count'];
      $frameCount.value = GlobalStorage.frameCount;
      $frameCount.addEventListener('change', function () {
        var value = +this.value;
        if (value > 0) {
          GlobalStorage.frameCount = value;
        }
      });

      var $distanceX = form['distance-x'];
      $distanceX.value = GlobalStorage.mostDistanceX;
      $distanceX.addEventListener('change', function () {
        var value = +this.value;
        if (value > 0) {
          GlobalStorage.mostDistanceX = value;
        }
      });

      var $distanceY = form['distance-y'];
      $distanceY.value = GlobalStorage.mostDistanceY;
      $distanceY.addEventListener('change', function () {
        var value = +this.value;
        if (value >= 0) {
          GlobalStorage.mostDistanceY = value;
        }
      });

      var $scale = form['scale'];
      $scale.value = GlobalStorage.scale;
      $scale.addEventListener('change', function () {
        var value = +this.value;
        if (value >= 0) {
          GlobalStorage.scale = value;
          GlobalStorage.step = GlobalStorage.canvasWidth / GlobalStorage.scale;
        }
      });

      var $horizonX = form['horizon-x'];
      $horizonX.value = GlobalStorage.horizonX;
      $horizonX.addEventListener('change', function () {
        GlobalStorage.horizonX = +this.value;
      });

      var $horizonY = form['horizon-y'];
      $horizonY.value = GlobalStorage.horizonY;
      $horizonY.addEventListener('change', function () {
        GlobalStorage.horizonY = +this.value;
        GlobalStorage.DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;
      });

      canvas.addEventListener('click', function (event) {
        GlobalStorage.horizonY = event.layerY;
        GlobalStorage.horizonX = event.layerX;

        $horizonX.value = GlobalStorage.horizonX;
        $horizonY.value = GlobalStorage.horizonY;

        GlobalStorage.DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;
      });
    }

    {
      form = document.getElementById('examples');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
      });

      const $showFloor = form['show-floor'];
      $showFloor.checked = GlobalStorage.examples.floor.showFloor;
      $showFloor.addEventListener('change', function () {
        GlobalStorage.examples.floor.showFloor = this.checked;
      });

      const $floorHeight = form['floor-height'];
      $floorHeight.value = GlobalStorage.examples.floor.height;
      $floorHeight.addEventListener('change', function () {
        GlobalStorage.examples.floor.height = +this.value;
      });

      const $floorXSpeed = form['floor-x-speed'];
      $floorXSpeed.value = GlobalStorage.examples.floor.speedX;
      $floorXSpeed.addEventListener('change', function () {
        GlobalStorage.examples.floor.speedX = +this.value;
      });

      const $floorYSpeed = form['floor-y-speed'];
      $floorYSpeed.value = GlobalStorage.examples.floor.speedY;
      $floorYSpeed.addEventListener('change', function () {
        GlobalStorage.examples.floor.speedY = +this.value;
      });

      const $showCube = form['show-cube'];
      $showCube.checked = GlobalStorage.examples.cube.showCube;
      $showCube.addEventListener('change', function () {
        GlobalStorage.examples.cube.showCube = this.checked;
      });

      const $cubeSize = form['cube-size'];
      $cubeSize.value = GlobalStorage.examples.cube.size;
      $cubeSize.addEventListener('change', function () {
        GlobalStorage.examples.cube.size = +this.value;
      });
    }
    {
      const $form = document.getElementById('custom-code');
      form.addEventListener('submit', function (event) {
        event.preventDefault();
      });
      const $customJsTextarea = $form['custom-js'];

      const defaultCode = `// Example using Point: Draw a circle moving in a 3D circle
const angle = time / 50;
const radius = 200;

// Center of the circle path in 3D space
const centerX = 400;
const centerY = 400;

const x = centerX + Math.cos(angle) * radius;
const y = centerY + Math.sin(angle) * radius;
const z = 0;

const p = new Point(x, y, z);

ctx.fillStyle = 'cyan';
ctx.beginPath();
ctx.arc(p.X, p.Z, 5, 0, Math.PI * 2);
ctx.fill();`;

      $customJsTextarea.value = defaultCode;

      try {
        GlobalStorage.customDraw = new Function('time', 'ctx', defaultCode);
      } catch (e) {
        console.error("Error parsing default custom code:", e);
      }

      $customJsTextarea.addEventListener('input', function () {
        try {
          GlobalStorage.customDraw = new Function('time', 'ctx', this.value);
        } catch (e) {
          console.error("Error parsing custom code:", e);
        }
      });
    }
  });
}
