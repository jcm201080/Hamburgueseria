document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("#board .cell"); // Selecciona las celdas dentro del tablero
    const statusText = document.querySelector("#status"); // Selecciona el elemento de estado
    const resetButton = document.querySelector("#reset"); // Selecciona el botón de reinicio
    let currentPlayer = "🍔"; // Jugador actual
    let boardState = Array(9).fill(null); // Estado del tablero
    let gameActive = true; // Controla si el juego está activo

    // Añade event listeners a las celdas
    cells.forEach(cell => cell.addEventListener("click", handleClick));

    // Añade event listener al botón de reinicio
    resetButton.addEventListener("click", resetGame);

    // Función para manejar los clics en las celdas
    function handleClick(e) {
        const index = Array.from(cells).indexOf(e.target); // Obtiene el índice de la celda clickeada
        if (boardState[index] || !gameActive) return; // Si la celda ya está ocupada o el juego no está activo, no hace nada

        boardState[index] = currentPlayer; // Actualiza el estado del tablero
        e.target.textContent = currentPlayer; // Muestra el símbolo del jugador en la celda

        const winner = checkWinner(); // Verifica si hay un ganador
        if (winner) {
            if (winner === "Empate") {
                statusText.textContent = "¡Es un empate!"; // Mensaje de empate
            } else {
                statusText.textContent = `¡${winner} gana!`; // Mensaje de victoria
            }
            gameActive = false; // Desactiva el juego
        } else {
            currentPlayer = currentPlayer === "🍔" ? "🍟" : "🍔"; // Cambia al siguiente jugador
            statusText.textContent = `Turno de: ${currentPlayer}`; // Actualiza el mensaje de estado
        }
    }

    // Función para verificar si hay un ganador
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]              // Diagonales
        ];

        // Verifica si alguna combinación ganadora está completa
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a]; // Devuelve el jugador ganador
            }
        }

        // Verifica si hay un empate
        if (!boardState.includes(null)) return "Empate";
        return null; // No hay ganador ni empate
    }

    // Función para reiniciar el juego
    function resetGame() {
        boardState = Array(9).fill(null); // Reinicia el estado del tablero
        cells.forEach(cell => cell.textContent = ""); // Limpia el contenido de las celdas
        statusText.textContent = `Turno de: 🍔`; // Restablece el mensaje de estado
        currentPlayer = "🍔"; // Restablece al primer jugador
        gameActive = true; // Reactiva el juego
    }
});
