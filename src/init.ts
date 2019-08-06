import Shape from "./classes";
import Utils from "./utils";
import { canvas } from "./canvas";

const { c } = canvas;
let { width, height } = canvas.canvas;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

export let mouse = {
    x: 0,
    y: 0
};

addEventListener('resize', () => {
    width = innerWidth;
    height = innerHeight;

    init();
});

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

let circleArray: Array<Shape>;

export function init() {
    circleArray = [];
    for (let i = 0; i < 400 ; i++) {
        let radius: number = Utils.randomIntFromRange(10, 30);
        let x     : number = Utils.randomIntFromRange(radius, width - radius);
        let y     : number = Utils.randomIntFromRange(radius, height - radius);
        let dx    : number = Utils.randomIntFromRange(-2, 2);
        let dy    : number = Utils.randomIntFromRange(-2, 2);
        let color : string = Utils.randomColor(colors);

        circleArray.push(new Shape(x, y, radius, color, dx, dy));
    }
}
export function animate() {
    c.fillStyle = 'rgba(225, 225, 225, 0.3)'
    c.fillRect(0, 0, width, height)

    for (let draw of circleArray) {
        draw.update();
    }

    requestAnimationFrame(animate);
}
