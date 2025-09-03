import {GlobalStorage} from "./defaultSettings.js";

export function wireSettingsFormTo(canvas) {
  var form;

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;

    body.appendChild(canvas);

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

      var $horizonX = form['horizon-x'];
      $horizonX.value = GlobalStorage.horizonX;

      var $horizonY = form['horizon-y'];
      $horizonY.value = GlobalStorage.horizonY;

      GlobalStorage.DD_ = GlobalStorage.canvasHeight - GlobalStorage.horizonY;
    });
  });
}
