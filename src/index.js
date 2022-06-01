// Contains all HTML element interaction


var canvas = document.getElementById("canvas");
var snake = new Snake(20, 20, 20);
var apple = new Apple();
var canvasContext = canvas.getContext("2d");
const fps = 10;

window.onload = () => {
    gameLoop();

}

function gameLoop() {
    setInterval(show, 1000 / fps);
}

function show() {
    updateCanvas();
    draw();
}

function updateCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();

    apple = snake.eatApple(apple);
    snake.checkHitWall();

}

function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black")
    createRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < snake.tail.length; i++) {
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, "white")
    }

    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00FF42";
    canvasContext.fillText("Score: " + (snake.tail.length + 1), canvas.width - 120, 18);

    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (event) => {
    let pressedKey = event.key; // Save the pressed key

    setTimeout(() => {
        if (pressedKey == "ArrowLeft" && snake.rotateX != 1) {
            snake.rotateX = -1;
            snake.rotateY = 0;
        }
        else if (pressedKey == "ArrowUp" && snake.rotateY != 1) {
            snake.rotateX = 0;
            snake.rotateY = -1;
        }
        else if (pressedKey == "ArrowRight" && snake.rotateX != -1) {
            snake.rotateX = 1;
            snake.rotateY = 0;
        }
        else if (pressedKey == "ArrowDown" && snake.rotateY != -1) {
            snake.rotateX = 0;
            snake.rotateY = 1;
        }
    }, 1)
});