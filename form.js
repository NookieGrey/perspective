import {GlobalStorage} from "./defaultSettings.js";

export function wireSettingsFormTo(canvas) {
  document.addEventListener("DOMContentLoaded", function () {
    {
      const form = document.getElementById('settings');
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
      });

      canvas.addEventListener('click', function (event) {
        GlobalStorage.horizonY = event.layerY;
        GlobalStorage.horizonX = event.layerX;

        $horizonX.value = GlobalStorage.horizonX;
        $horizonY.value = GlobalStorage.horizonY;
      });
    }

    {
      const form = document.getElementById('examples');
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

      const $showTunnel = form['show-tunnel'];
      $showTunnel.checked = GlobalStorage.examples.tunnel.showTunnel;
      $showTunnel.addEventListener('change', function () {
        GlobalStorage.examples.tunnel.showTunnel = this.checked;
      });

      const $tunnelHeight = form['tunnel-height'];
      $tunnelHeight.value = GlobalStorage.examples.tunnel.height;
      $tunnelHeight.addEventListener('change', function () {
        GlobalStorage.examples.tunnel.height = +this.value;
      });

      const $tunnelXSpeed = form['tunnel-x-speed'];
      $tunnelXSpeed.value = GlobalStorage.examples.tunnel.speedX;
      $tunnelXSpeed.addEventListener('change', function () {
        GlobalStorage.examples.tunnel.speedX = +this.value;
      });

      const $tunnelRadius = form['tunnel-radius'];
      $tunnelRadius.value = GlobalStorage.examples.tunnel.radius;
      $tunnelRadius.addEventListener('change', function () {
        GlobalStorage.examples.tunnel.radius = +this.value;
      });

      const $tunnelVerticalEndpointOffset = form['tunnel-vertical-endpoint-offset'];
      $tunnelVerticalEndpointOffset.value = GlobalStorage.examples.tunnel.verticalEndpointOffset;
      $tunnelVerticalEndpointOffset.addEventListener('change', function () {
        GlobalStorage.examples.tunnel.verticalEndpointOffset = +this.value;
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
      $form.addEventListener('submit', function (event) {
        event.preventDefault();
      });
      const $customJsTextarea = $form['custom-js'];

      const defaultCode = `// You have got ctx, time in the scope\n// also Point, GlobalStorage available in global scope`;

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
