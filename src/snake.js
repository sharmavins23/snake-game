class Snake {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{ x: this.x, y: this.y }]
        this.rotateX = 0
        this.rotateY = 1
    }

    // Move the snake according to the rotation and the current positioning
    move() {
        var newRect;
        if (this.rotateX == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift() // Remove the old tail
        this.tail.push(newRect); // Place the new head
    }

    eatApple(apple) {
        let snakeHead = this.tail[this.tail.length - 1];

        // If we find a collision with the apple object...
        if (snakeHead.x == apple.x && snakeHead.y == apple.y) {
            this.tail[this.tail.length] = {
                x: apple.x,
                y: apple.y
            }
            return new Apple();
        } else {
            return apple; // We didn't need to update the old apple
        }
    }

    checkHitWall() {
        let snakeHead = this.tail[this.tail.length - 1];

        if (snakeHead.x == - this.size) {
            snakeHead.x = canvas.width - this.size;
        } else if (snakeHead.x == canvas.width) {
            snakeHead.x = 0;
        } else if (snakeHead.y == - this.size) {
            snakeHead.y = canvas.height - this.size;
        } else if (snakeHead.y == canvas.height) {
            snakeHead.y = 0;
        }
    }
}