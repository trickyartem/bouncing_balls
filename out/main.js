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
var circleArray;
function init() {
    circleArray = [];
    for (var i = 0; i < 400; i++) {
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