// Contains all HTML element interaction


var canvas = document.getElementById("canvas");
var score = document.getElementById("score");
var canvasContext = canvas.getContext("2d"); // Used for drawing objects

var snake = new Snake(20, 20, 20);
var apple = new Apple();
const fps = 15;

// ===== Recurring window events ===============================================

// On page load, start the game
window.onload = () => {
    gameLoop();

}

// Loop the game with updating the canvas, score, and redrawing the board
function gameLoop() {
    setInterval(() => {
        updateCanvas();
        updateScore();
        draw();
    }, 1000 / fps);
}

function updateScore() {
    score.innerHTML = snake.tail.length;
}

function updateCanvas() {
    // Clear the board
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // Update the snake's positioning
    snake.move();
    // Check for a collision with an apple
    apple = snake.eatApple(apple);
    // Check for a collision with the wall
    snake.checkHitWall();

}

function draw() {
    // Create the board
    createRect(0, 0, canvas.width, canvas.height, "black")

    // Draw the full snake body
    for (var i = 0; i < snake.tail.length; i++) {
        createRect(
            snake.tail[i].x + 2.5,
            snake.tail[i].y + 2.5,
            snake.size - 5,
            snake.size - 5,
            "white"
        )
    }

    // Create the apple on the screen
    createRect(
        apple.x,
        apple.y,
        apple.size,
        apple.size,
        apple.color
    );
}

// ===== Board drawing handlers ================================================

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

// ===== Event handlers ========================================================

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