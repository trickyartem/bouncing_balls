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
addEventListener('click', function () {
    init();
});
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.randomIntFromRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Utils.prototype.randomColor = function (col) {
        return col[Math.floor(Math.random() * colors.length)];
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
        this.dy = dy;
        this.dx = dx;
        this.radius = radius;
        this.color = color;
        this.gravity = 1;
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
        this.y + this.radius + this.dy > canvas.height ? this.dy *= -1 * this.friction : this.dy += this.gravity;
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
    return Shape;
}());
var circleArray = [];
var utils = new Utils;
function init() {
    circleArray = [];
    for (var i = 0; i < 400; i++) {
        var radius = utils.randomIntFromRange(10, 30);
        var x = utils.randomIntFromRange(radius, canvas.width - radius);
        var y = utils.randomIntFromRange(0, canvas.height / 2);
        var dx = utils.randomIntFromRange(-2, 2);
        var dy = utils.randomIntFromRange(-2, 2);
        var color = utils.randomColor(colors);
        circleArray.push(new Shape(x, y, radius, color, dx, dy));
    }
}
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
var animate = new Animate();
init();
animate.display();
//# sourceMappingURL=main.js.map