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

addEventListener('click', () => {
    init();
});

class Utils {
    randomIntFromRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    randomColor(col: string[]) {
        return col[Math.floor(Math.random() * colors.length)]
    }
}


class Shape {
    private gravity : number;
    private friction: number;

    constructor(private x: number, private y: number, private radius: number, private color: string, private dx: number, private dy: number) {
        this.x        = x;
        this.y        = y;
        this.dy       = dy;
        this.dx       = dx;
        this.radius   = radius;
        this.color    = color;
        this.gravity  = 1;
        this.friction = 0.89;
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();
        c.closePath();
    }

    update() {
        this.y + this.radius + this.dy > canvas.height ? this.dy *= -1 * this.friction : this.dy += this.gravity;
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) { this.dx *= -1 }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

let circleArray: Array<Shape> = [];
let utils      : Utils        = new Utils;

function init() {
    circleArray = [];
    for (let i = 0; i < 400; i++) {
        let radius: number = utils.randomIntFromRange(10, 30);
        let x     : number = utils.randomIntFromRange(radius, canvas.width - radius);
        let y     : number = utils.randomIntFromRange(0, canvas.height / 2);
        let dx    : number = utils.randomIntFromRange(-2, 2);
        let dy    : number = utils.randomIntFromRange(-2, 2);
        let color : string = utils.randomColor(colors);

        circleArray.push(new Shape(x, y, radius, color, dx, dy))
    }
}

class Animate {
    display() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        for(let draw of circleArray) {
            draw.update();
        }

        requestAnimationFrame(() => this.display());
    }
}
const animate = new Animate();

init();
animate.display();
