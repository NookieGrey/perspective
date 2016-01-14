function Solid() {

}

Solid.distanceY = function (distance) {
    var X = distance + Settings.pd;
    var x = distance;
    var Y = Settings.canvasHeight - Settings.horizonY;
    return Y * x / X;
};

Solid.distanceX = function (distance, distanceY) {
    var y = distanceY;
    var Y = Settings.canvasHeight - Settings.horizonY;
    var X = distance - Settings.horizonX;
    return y / Y * X;
};

Solid.distanceZ = function (H, distanceY) {
    var Y = Settings.canvasHeight - Settings.horizonY;
    var y = Y - distanceY;
    return y / Y * H;
};

function Point(x, y, z, options) {
    this._x = x || 0;
    this._y = y || 0;
    this._z = z || 0;
    this.options = options || {};
    this.options.color = this.options.color || 'gold';

    var Y = Point.distanceY(y);
    var X = Point.distanceX(x, Y);

    var Z = Point.distanceZ(z, Y);

    this.x = X;
    this.y = Y;
    this.z = Z;

    this.X = x - X;
    this.Y = Settings.canvasHeight - Y;
    this.Z = Settings.canvasHeight - Y - Z;
}

for (var key in Solid) {
    if (Solid.hasOwnProperty(key)) Point[key] = Solid[key]
}

Point.prototype.draw = function () {
    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.arc(this.X, this.Z, 3, 0, Math.PI * 2, true);
    ctx.fill();
};

Point.prototype.drawProjection = function () {
    ctx.strokeStyle = this.options.color;
    ctx.beginPath();
    ctx.moveTo(this.X, this.Y);
    ctx.lineTo(this.X, this.Z);
    ctx.stroke();
};

function Segment(A, B, options) {
    this._A = A;
    this._B = B;

    this.options = options || {};
    this.options.color = this.options.color || 'gold';
}

Segment.prototype.draw = function () {
    ctx.strokeStyle = this.options.color;
    ctx.beginPath();
    ctx.moveTo(this._A.x, this._B.z);
    ctx.lineTo(this._B.x, this._B.z);
    ctx.stroke();
};