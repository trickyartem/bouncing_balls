class Utils {
    static randomIntFromRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static randomColor(col: string[]) {
        return col[Math.floor(Math.random() * colors.length)]
    }

    static getDist(x1: number, y1: number, x2: number, y2: number) {

    }
}

class Shape {
    constructor(private x: number, private y: number, private radius: number, private color: string, public dx: number, public dy: number) {
        this.x        = x;
        this.y        = y;
        this.dy       = 0;
        this.dx       = 0;
        this.radius   = radius;
        this.color    = color;
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
                } else {
                    this.dx += 20;
                    this.dy += 20;
                }
        } else {
            if (this.dx != 0) {
                this.dx < 0 ? this.dx += 0.1 : this.dx -= 0.1;
            }

            if (this.dy != 0) {
                this.dy < 0 ? this.dy += 0.1 : this.dy -= 0.1;
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
