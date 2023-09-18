import {Constants} from "./defaultSettings.js";

export function addListeners(canvas) {
  var form;

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;

    body.appendChild(canvas);

    form = document.getElementById('settings');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    var $pd = form.pd;
    $pd.value = Constants.pd;
    $pd.addEventListener('change', function () {
      var value = +this.value;
      if (value > 0) {
        Constants.pd = value;
      }
    });

    var $frameCount = form['frame-count'];
    $frameCount.value = Constants.frameCount;
    $frameCount.addEventListener('change', function () {
      var value = +this.value;
      if (value > 0) {
        Constants.frameCount = value;
      }
    });

    var $distanceX = form['distance-x'];
    $distanceX.value = Constants.mostDistanceX;
    $distanceX.addEventListener('change', function () {
      var value = +this.value;
      if (value > 0) {
        Constants.mostDistanceX = value;
      }
    });

    var $distanceY = form['distance-y'];
    $distanceY.value = Constants.mostDistanceY;
    $distanceY.addEventListener('change', function () {
      var value = +this.value;
      if (value >= 0) {
        Constants.mostDistanceY = value;
      }
    });

    var $scale = form['scale'];
    $scale.value = Constants.scale;
    $scale.addEventListener('change', function () {
      var value = +this.value;
      if (value >= 0) {
        Constants.scale = value;
        Constants.step = Constants.canvasWidth / Constants.scale;
      }
    });

    var $horizonX = form['horizon-x'];
    $horizonX.value = Constants.horizonX;
    $horizonX.addEventListener('change', function () {
      Constants.horizonX = +this.value;
    });

    var $horizonY = form['horizon-y'];
    $horizonY.value = Constants.horizonY;
    $horizonY.addEventListener('change', function () {
      Constants.horizonY = +this.value;
    });

    canvas.addEventListener('click', function (event) {
      Constants.horizonY = event.layerY;
      Constants.horizonX = event.layerX;

      var $horizonX = form['horizon-x'];
      $horizonX.value = Constants.horizonX;

      var $horizonY = form['horizon-y'];
      $horizonY.value = Constants.horizonY;

      Constants.DD_ = Constants.canvasHeight - Constants.horizonY;
    });
    //
    // canvas.addEventListener('wheel', function (event) {
    //   var delta = event.deltaY > 0 ? 10 : -10;
    //   var cpd = Constants.pd + delta;
    //   if (cpd > 0) {
    //     Constants.pd = cpd;
    //   }
    //   var $pd = form.pd;
    //   $pd.value = Constants.pd;
    // });
  });
}