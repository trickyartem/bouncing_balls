const canvas          = document.createElement('canvas');
const c               = canvas.getContext('2d');

canvas.width          = window.innerWidth;
canvas.height         = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.top      = "0";
canvas.style.left     = "0";
canvas.style.zIndex   = "-8";

const body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

let mouse = {
    x: 0,
    y: 0
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

let circleArray: Array<Shape>;

function init() {
    circleArray = [];
    for (let i = 0; i < 400 ; i++) {
        let radius: number = Utils.randomIntFromRange(10, 30);
        let x     : number = Utils.randomIntFromRange(radius, canvas.width - radius);
        let y     : number = Utils.randomIntFromRange(radius, canvas.height - radius);
        let dx    : number = Utils.randomIntFromRange(-2, 2);
        let dy    : number = Utils.randomIntFromRange(-2, 2);
        let color : string = Utils.randomColor(colors);

        circleArray.push(new Shape(x, y, radius, color, dx, dy));
    }
}


const animate = new Animate();

init();
animate.display();
