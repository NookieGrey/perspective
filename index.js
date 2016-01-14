CanvasRenderingContext2D.prototype.clear =
    CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
        if (preserveTransform) {
            this.save();
            this.setTransform(1, 0, 0, 1, 0, 0);
        }

        this.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (preserveTransform) {
            this.restore();
        }
    };


Settings.canvasWidth = window.innerWidth;
Settings.canvasHeight = window.innerHeight;
Settings.step = Settings.canvasWidth / Settings.scale;
Settings.globalZ = 0;


var canvas = document.createElement('canvas');
canvas.width = Settings.canvasWidth;
canvas.height = Settings.canvasHeight;

var ctx = Settings.ctx = canvas.getContext("2d");
var form;

document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;

    body.appendChild(canvas);

    form = document.getElementById('settings');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    var $pd = form.pd;
    $pd.value = Settings.pd;
    $pd.addEventListener('change', function () {
        var value = +this.value;
        if (value > 0) {
            Settings.pd = value;
        }
    });

    var $frameCount = form['frame-count'];
    $frameCount.value = Settings.frameCount;
    $frameCount.addEventListener('change', function () {
        var value = +this.value;
        if (value > 0) {
            Settings.frameCount = value;
        }
    });

    var $distanceX = form['distance-x'];
    $distanceX.value = Settings.mostDistanceX;
    $distanceX.addEventListener('change', function () {
        var value = +this.value;
        if (value > 0) {
            Settings.mostDistanceX = value;
        }
    });

    var $distanceY = form['distance-y'];
    $distanceY.value = Settings.mostDistanceY;
    $distanceY.addEventListener('change', function () {
        var value = +this.value;
        if (value >= 0) {
            Settings.mostDistanceY = value;
        }
    });

    var $scale = form['scale'];
    $scale.value = Settings.mostDistanceY;
    $scale.addEventListener('change', function () {
        var value = +this.value;
        if (value >= 0) {
            Settings.scale = value;
            Settings.step = Settings.canvasWidth / Settings.scale;
        }
    });

    var $horizonX = form['horizon-x'];
    $horizonX.value = Settings.horizonX;
    $horizonX.addEventListener('change', function () {
        Settings.horizonX = +this.value;
    });

    var $horizonY = form['horizon-y'];
    $horizonY.value = Settings.horizonY;
    $horizonY.addEventListener('change', function () {
        Settings.horizonY = +this.value;
    });

    var $globalZ = form['global-z'];
    $globalZ.value = Settings.globalZ;
    $globalZ.addEventListener('change', function () {
        Settings.globalZ = +this.value;
    });


});

canvas.addEventListener('click', function (event) {
    Settings.horizonY = event.layerY;
    Settings.horizonX = event.layerX;

    var $horizonX = form['horizon-x'];
    $horizonX.value = Settings.horizonX;

    var $horizonY = form['horizon-y'];
    $horizonY.value = Settings.horizonY;

    console.log(Settings.horizonX, Settings.horizonY);
});

canvas.addEventListener('wheel', function (event) {
    var delta = event.deltaY > 0 ? 10 : -10;
    var cpd = Settings.pd + delta;
    if (cpd > 0) {
        Settings.pd = cpd;
    }
    var $pd = form.pd;
    $pd.value = Settings.pd;
});

function draw(time) {
    ctx.clear();

    //var horizon = new Point(Settings.canvasWidth/2, Settings.canvasWidth*Settings.mostDistanceX, 0 - Settings.globalZ);
    //Settings.horizonX = horizon.X;
    //Settings.horizonY = horizon.Z;

    var frame = (time) % Settings.frameCount;
    var maxDistance = Settings.canvasWidth * Settings.mostDistanceX;
    var count = Settings.scale * Settings.mostDistanceX;

    var leftEnd = 0 - (Settings.mostDistanceY - 1) / 2 * Settings.canvasWidth;
    var rightEnd = Settings.canvasWidth + (Settings.mostDistanceY - 1) / 2 * Settings.canvasWidth;

    function getDistance(index) {
        if (index == count) return maxDistance;
        var order = maxDistance * index / count;

        var step = (1 - frame / Settings.frameCount) * Settings.step;
        return order + step;
    }

    (function drawHorizonLines() {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        for (var i = 0; i <= count; i++) {
            var distance = getDistance(i);

            var A = new Point(leftEnd, distance, 0 - Settings.globalZ);
            var B = new Point(rightEnd, distance, 0 - Settings.globalZ);
            ctx.moveTo(A.X, A.Z);
            ctx.lineTo(B.X, B.Z);
        }
        ctx.stroke();
    })();

    (function drawVerticalLines() {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        for (var c = leftEnd; c <= rightEnd; c += Settings.step) {
            var A = new Point(c, 0, 0 - Settings.globalZ);
            var B = new Point(c, Settings.mostDistanceX*Settings.canvasWidth, 0 - Settings.globalZ);
            ctx.moveTo(A.X, A.Z);
            ctx.lineTo(B.X, B.Y);
        }
        ctx.stroke();
    })();


    (function drawTunnel() {
        ctx.strokeStyle = 'white';

        var alpha = Math.PI / 180 * 59.2;
        var height = Settings.canvasHeight * 2;
        var left = Settings.canvasWidth / 2;


        ctx.beginPath();

        var A = new Point(left - height * Math.cos(alpha), Settings.mostDistanceX*Settings.canvasWidth, 0 - Settings.globalZ);
        var B = new Point(left + height * Math.cos(alpha), Settings.mostDistanceX*Settings.canvasWidth, 0 - Settings.globalZ);
        // rails
        ctx.moveTo(left - height * Math.cos(alpha), Settings.canvasHeight);
        ctx.lineTo(A.X, A.Y);

        ctx.moveTo(left + height * Math.cos(alpha), Settings.canvasHeight);
        ctx.lineTo(B.X, B.Y);

        ctx.stroke();

        ctx.beginPath();
        for (var y = 0; y <= count; y++) {
            var O = new Point(left, getDistance(y), height - Settings.globalZ);

            var X = O.X;
            var Y = O.Z;
            var R = O.z;
            var sagitta = R - R * Math.sin(alpha);
            ctx.moveTo(X + R * Math.cos(alpha), Y + R * Math.sin(alpha) + sagitta);
            ctx.arc(X, Y + sagitta, R, Math.PI - alpha, alpha, false);
        }

        ctx.stroke();

    })();

}

requestAnimationFrame = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

//draw(0);
//
var stop;
var time = 0;
loop();
function loop() {
    if (!stop) {
        time++;
        draw(time);

    }

    requestAnimationFrame(loop);
}




function deg(rad) {
    return rad / Math.PI * 180;
}

//document.body.addEventListener('click', function () {
//    stop = !stop;
//});