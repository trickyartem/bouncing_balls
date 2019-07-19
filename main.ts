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

class Shape {
    private gravity : number;
    private friction: number;

    constructor(private x: number, private y: number, private radius: number, private color: string, public dx: number, public dy: number) {
        this.x        = x;
        this.y        = y;
        this.dy       = 0;
        this.dx       = 0;
        this.radius   = radius;
        this.color    = color;
        this.gravity  = 0;
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
        if (mouse.x > this.x - this.radius && mouse.x < this.x + this.radius &&
            mouse.y > this.y - this.radius && mouse.y < this.y + this.radius) {
                if (mouse.x > this.x || mouse.y > this.y) {
                    this.dx -= 20;
                    this.dy -= 20;
                    this.gravity -= 5;
                } else {
                    this.dx += 20;
                    this.dy += 20;
                    this.gravity += 5;
                }
        } else {
            this.gravity = 0;
            if (this.dx != 0) {
                this.dx < 0 ? this.dx += 0.1 : this.dx -= 0.1;
            }

            if (this.dy != 0) {
                this.dy < 0 ? this.dy += 0.1 : this.dx -= 0.1;
            }
        }

        if (this.x + this.radius + this.dx > canvas.width  || this.x - this.radius <= 0) { this.dx *= -1 }
        if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius <= 0) { this.dy *= -1 }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
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

class Utils {
    static randomIntFromRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static randomColor(col: string[]) {
        return col[Math.floor(Math.random() * colors.length)]
    }
}


let circleArray: Array<Shape> = [];

function init() {
    circleArray = [];
    for (let i = 0; i < 200 ; i++) {
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
