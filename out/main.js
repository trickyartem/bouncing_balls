var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-8";
var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);
var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
var mouse = {
    x: 0,
    y: 0
};
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
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
        this.gravity = 0;
        this.friction = 0.89;
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
                this.gravity -= 5;
            }
            else {
                this.dx += 20;
                this.dy += 20;
                this.gravity += 5;
            }
        }
        else {
            this.gravity = 0;
            if (this.dx != 0) {
                this.dx < 0 ? this.dx += 0.1 : this.dx -= 0.1;
            }
            if (this.dy != 0) {
                this.dy < 0 ? this.dy += 0.1 : this.dx -= 0.1;
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
var Utils = (function () {
    function Utils() {
    }
    Utils.randomIntFromRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Utils.randomColor = function (col) {
        return col[Math.floor(Math.random() * colors.length)];
    };
    return Utils;
}());
var circleArray = [];
function init() {
    circleArray = [];
    for (var i = 0; i < 200; i++) {
        var radius = Utils.randomIntFromRange(10, 30);
        var x = Utils.randomIntFromRange(radius, canvas.width - radius);
        var y = Utils.randomIntFromRange(radius, canvas.height - radius);
        var dx = Utils.randomIntFromRange(-2, 2);
        var dy = Utils.randomIntFromRange(-2, 2);
        var color = Utils.randomColor(colors);
        circleArray.push(new Shape(x, y, radius, color, dx, dy));
    }
}
var animate = new Animate();
init();
animate.display();
//# sourceMappingURL=main.js.map