import { canvas } from './canvas';
import { mouse } from "./init";

const { c } = canvas;
const { width, height } = canvas.canvas;

class Shape {
    constructor(private x: number, private y: number, private radius: number, private color: string, public dx: number, public dy: number) { }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();
        c.closePath();
    }

    update() {
        const { x, y, dx, dy, radius } = this;

        if (mouse.x > x - 50 && mouse.x < x + 50 &&
            mouse.y > y - 50 && mouse.y < y + 50) {
                if (mouse.x > x || mouse.y > y) {
                    this.dx -= 20;
                    this.dy -= 20;
                } else {
                    this.dx += 20;
                    this.dy += 20;
                }
        } else {
            if (dx != 0) {
                dx < 0 ? this.dx += 0.1 : this.dx -= 0.1;
            }

            if (dy != 0) {
                dy < 0 ? this.dy += 0.1 : this.dy -= 0.1;
            }
        }

        if (x + radius + dx > width  || x - radius <= 0) { this.dx *= -1 }
        if (y + radius + dy > height || y - radius <= 0) { this.dy *= -1 }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

export default Shape;
