const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

const button = document.getElementsByTagName("button")[0];

button.onclick = e => {
    let dataUrl = canvas.toDataURL("image/png"); 
    let img = document.createElement("img");
    img.src = dataUrl;
    document.querySelector(".container").appendChild(img);
}

class Brush {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.paint = false;
        this.thickness = 20;
        this.color = "darkolivegreen";

        const inputThickness = document.querySelector(".brush-thickness");
        const inputColor = document.querySelector(".brush-color");
        inputThickness.value = this.thickness;
        inputColor.value = this.color;

        inputThickness.onchange = e => {
            this.thickness = inputThickness.value;
        }

        inputColor.onchange = e => {
            this.color = inputColor.value;
        }

        canvas.onmousemove = e => {
            this.x = e.layerX;
            this.y = e.layerY;
        }
        canvas.onmousedown = e => {
            this.paint = true;
        }
        canvas.onmouseup = e => {
            this.paint = false;
        }
        canvas.onmouseout = e => {
            this.paint = false;
        }
    }
}

const brush = new Brush();

let lastX;
let lastY;

function update() {
    if(brush.paint) draw();
    lastX = brush.x;
    lastY = brush.y;
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(brush.x, brush.y);
    ctx.lineWidth = brush.thickness;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = brush.color;
    ctx.stroke();
}

function render() {
    update();
    window.requestAnimationFrame(render);
}

render();