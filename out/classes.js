var Utils = (function () {
    function Utils() {
    }
    Utils.randomIntFromRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Utils.randomColor = function (col) {
        return col[Math.floor(Math.random() * colors.length)];
    };
    Utils.getDist = function (x1, y1, x2, y2) {
    };
    return Utils;
}());
var Shape = (function () {
    function Shape(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.dx = 0;
        this.radius = radius;
        this.color = color;
    }
    Shape.prototype.draw = function () {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();
        c.closePath();
    };
    Shape.prototype.update = function () {
        if (mouse.x > this.x - this.radius && mouse.x < this.x + this.radius &&
            mouse.y > this.y - this.radius && mouse.y < this.y + this.radius) {
            if (mouse.x > this.x || mouse.y > this.y) {
                this.dx -= 20;
                this.dy -= 20;
            }
            else {
                this.dx += 20;
                this.dy += 20;
            }
        }
        else {
            if (this.dx != 0) {
                this.dx < 0 ? this.dx += 0.1 : this.dx -= 0.1;
            }
            if (this.dy != 0) {
                this.dy < 0 ? this.dy += 0.1 : this.dy -= 0.1;
            }
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx *= -1;
        }
        if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius <= 0) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
    return Shape;
}());
var Animate = (function () {
    function Animate() {
    }
    Animate.prototype.display = function () {
        var _this = this;
        c.clearRect(0, 0, canvas.width, canvas.height);
        for (var _i = 0, circleArray_1 = circleArray; _i < circleArray_1.length; _i++) {
            var draw = circleArray_1[_i];
            draw.update();
        }
        requestAnimationFrame(function () { return _this.display(); });
    };
    return Animate;
}());
//# sourceMappingURL=classes.js.map