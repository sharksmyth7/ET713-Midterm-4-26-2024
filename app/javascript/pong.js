document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("pongCanvas");
    const ctx = canvas.getContext("2d");

    // Ball properties
    const ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let dx = 2;
    let dy = -2;

    // Paddle properties
    const paddleHeight = 80;
    const paddleWidth = 10;
    let paddleLeftY = (canvas.height - paddleHeight) / 2;
    let paddleRightY = (canvas.height - paddleHeight) / 2;

    // Keyboard controls
    let upPressed = false;
    let downPressed = false;
    let wPressed = false;
    let sPressed = false;

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddles() {
        // Left paddle
        ctx.beginPath();
        ctx.rect(0, paddleLeftY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

        // Right paddle
        ctx.beginPath();
        ctx.rect(canvas.width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddles();
        x += dx;
        y += dy;

        // Ball collision with top and bottom walls
        if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }

        // Ball collision with paddles
        if (x + dx > canvas.width - ballRadius - paddleWidth && y > paddleRightY && y < paddleRightY + paddleHeight ||
            x + dx < ballRadius + paddleWidth && y > paddleLeftY && y < paddleLeftY + paddleHeight) {
            dx = -dx;
        }

        // Handle paddle movement
        if (upPressed && paddleRightY > 0) {
            paddleRightY -= 7;
        } else if (downPressed && paddleRightY < canvas.height - paddleHeight) {
            paddleRightY += 7;
        }

        if (wPressed && paddleLeftY > 0) {
            paddleLeftY -= 7;
        } else if (sPressed && paddleLeftY < canvas.height - paddleHeight) {
            paddleLeftY += 7;
        }
    }

    // Keyboard controls
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == "ArrowUp") {
            upPressed = true;
        } else if (e.key == "ArrowDown") {
            downPressed = true;
        } else if (e.key == "w") {
            wPressed = true;
        } else if (e.key == "s") {
            sPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "ArrowUp") {
            upPressed = false;
        } else if (e.key == "ArrowDown") {
            downPressed = false;
        } else if (e.key == "w") {
            wPressed = false;
        } else if (e.key == "s") {
            sPressed = false;
        }
    }

    setInterval(draw, 10);
});
