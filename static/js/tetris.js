document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("tetris");
    const ctx = canvas.getContext("2d");
    const ROWS = 20;
    const COLS = 10;
    const BLOCK_SIZE = 30;
    const board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;

    // Colores temporales para cada ficha
    const colors = [
        "cyan", "yellow", "red", "green", "orange", "blue", "purple"
    ];

    /*
    // Si quieres usar imágenes, descomenta esto más adelante:
    const colors = {
        1: "/static/img/ficha1.png",
        2: "/static/img/ficha2.png",
        3: "/static/img/ficha3.png",
        4: "/static/img/ficha4.png",
        5: "/static/img/ficha5.png",
        6: "/static/img/ficha6.png",
        7: "/static/img/ficha7.png",
    };
    */

    const SHAPES = [
        [[1, 1, 1, 1]], // Línea
        [[1, 1], [1, 1]], // Cuadrado
        [[1, 1, 0], [0, 1, 1]], // Z
        [[0, 1, 1], [1, 1, 0]], // S
        [[1, 0, 0], [1, 1, 1]], // L
        [[0, 0, 1], [1, 1, 1]], // J
        [[0, 1, 0], [1, 1, 1]], // T
    ];

    let piece = {
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        row: 0,
        col: Math.floor(COLS / 2) - 1,
        color: Math.floor(Math.random() * colors.length),
    };

    function drawBlock(x, y, colorIndex) {
        if (colorIndex !== null) {
            ctx.fillStyle = colors[colorIndex];
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            ctx.strokeStyle = "black";
            ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }

        /*
        // Si quieres usar imágenes en lugar de colores, usa esto:
        if (colorIndex) {
            let img = new Image();
            img.src = colors[colorIndex];
            img.onload = () => {
                ctx.drawImage(img, x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            };
        }
        */
    }

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                drawBlock(c, r, board[r][c]);
            }
        }
    }

    function drawPiece() {
        piece.shape.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell) {
                    drawBlock(piece.col + c, piece.row + r, piece.color);
                }
            });
        });
    }

    function movePiece(dx, dy) {
        if (!collision(dx, dy, piece.shape)) {
            piece.col += dx;
            piece.row += dy;
            drawGame();
        } else if (dy > 0) {
            mergePiece();
            removeFullRows();
            spawnNewPiece();
        }
    }

    function collision(dx, dy, shape) {
        return shape.some((row, r) =>
            row.some(
                (cell, c) =>
                    cell &&
                    (piece.row + r + dy >= ROWS ||
                        piece.col + c + dx < 0 ||
                        piece.col + c + dx >= COLS ||
                        board[piece.row + r + dy]?.[piece.col + c + dx])
            )
        );
    }

    function mergePiece() {
        piece.shape.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell) {
                    board[piece.row + r][piece.col + c] = piece.color;
                }
            });
        });
    }

    function removeFullRows() {
        for (let r = ROWS - 1; r >= 0; r--) {
            if (board[r].every((cell) => cell)) {
                board.splice(r, 1);
                board.unshift(Array(COLS).fill(0));
            }
        }
    }

    function spawnNewPiece() {
        piece.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        piece.row = 0;
        piece.col = Math.floor(COLS / 2) - 1;
        piece.color = Math.floor(Math.random() * colors.length);
        if (collision(0, 0, piece.shape)) {
            alert("Game Over");
            board.forEach((row) => row.fill(0));
        }
    }

    function rotatePiece() {
        const newShape = piece.shape[0].map((_, i) => piece.shape.map(row => row[i])).reverse();
        if (!collision(0, 0, newShape)) {
            piece.shape = newShape;
            drawGame();
        }
    }

    function drawGame() {
        drawBoard();
        drawPiece();
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            movePiece(-1, 0);
        } else if (event.key === "ArrowRight") {
            movePiece(1, 0);
        } else if (event.key === "ArrowDown") {
            movePiece(0, 1);
        } else if (event.key === "ArrowUp") {
            rotatePiece();
        }
    });

    setInterval(() => movePiece(0, 1), 500);

    drawGame();
});
