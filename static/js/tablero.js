document.addEventListener("DOMContentLoaded", function() {
    const tablero = document.getElementById("tablero");
    const tirarDadoBtn = document.getElementById("tirarDado");
    const estadoJuego = document.getElementById("estadoJuego");
    const numJugadoresInput = document.getElementById("numJugadores");
    const iniciarJuegoBtn = document.getElementById("iniciarJuego");
    const nombresJugadoresDiv = document.getElementById("nombresJugadores");

    let jugadores = [];
    let turno = 0;
    let juegoTerminado = false;
    let jugadoresPenalizados = new Set();

    iniciarJuegoBtn.addEventListener("click", function() {
        const numJugadores = parseInt(numJugadoresInput.value);
        if (numJugadores < 1 || numJugadores > 6) {
            alert("El número de jugadores debe estar entre 1 y 6.");
            return;
        }

        // Limpiar nombres anteriores y pedir nuevos
        nombresJugadoresDiv.innerHTML = "";
        jugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Nombre del jugador ${i + 1}`;
            input.classList.add("nombreJugador");
            nombresJugadoresDiv.appendChild(input);
        }

        const confirmarBtn = document.createElement("button");
        confirmarBtn.textContent = "Confirmar nombres";
        confirmarBtn.addEventListener("click", iniciarPartida);
        nombresJugadoresDiv.appendChild(confirmarBtn);
    });

    function iniciarPartida() {
        const inputs = document.querySelectorAll(".nombreJugador");
        jugadores = [];

        inputs.forEach((input, i) => {
            let nombre = input.value.trim();
            if (nombre === "") nombre = `Jugador ${i + 1}`;
            jugadores.push({ nombre, posicion: 0, ficha: null });
        });

        // Reiniciar el juego
        tablero.innerHTML = "";
        turno = 0;
        juegoTerminado = false;
        jugadoresPenalizados.clear();
        estadoJuego.textContent = "";
        nombresJugadoresDiv.innerHTML = "";

        // Crear el tablero
        for (let i = 1; i <= 35; i++) {
            const casilla = document.createElement("div");
            casilla.classList.add("casilla");
            casilla.textContent = i;

            if (i === 12 || i === 19) {
                casilla.classList.add("penalizacion");
            } else if (i === 4 || i === 22) {
                casilla.classList.add("especial");
            }

            tablero.appendChild(casilla);
        }

        // Crear fichas para los jugadores
        jugadores.forEach((jugador, index) => {
            const ficha = document.createElement("div");
            ficha.classList.add("ficha");
            ficha.textContent = jugador.nombre;
            ficha.style.backgroundColor = `hsl(${index * 60}, 70%, 50%)`;
            jugador.ficha = ficha;
            tablero.children[0].appendChild(ficha);
        });

        tirarDadoBtn.disabled = false;
    }

 function moverJugador(jugador, pasos) {
    // Eliminar la ficha de la casilla actual
    const casillaActual = tablero.children[jugador.posicion];
    if (casillaActual.contains(jugador.ficha)) {
        casillaActual.removeChild(jugador.ficha);
    }

    let nuevaPosicion = jugador.posicion + pasos;

    // Si sobrepasa la casilla 34, retrocede la diferencia
    if (nuevaPosicion > 34) {
        let exceso = nuevaPosicion - 34;
        nuevaPosicion = 34 - exceso;
        estadoJuego.textContent = `${jugador.nombre} saca un ${pasos} y rebota, retrocede a la casilla ${nuevaPosicion + 1}.`;
    }

    jugador.posicion = nuevaPosicion;

    if (jugador.posicion === 34) {
        estadoJuego.textContent = `${jugador.nombre} ha ganado el juego! 🎉`;
        juegoTerminado = true;
        tirarDadoBtn.disabled = true;
        return false; // Fin del juego
    }

    if (jugador.posicion === 12 || jugador.posicion === 19) {
        estadoJuego.textContent = `${jugador.nombre} cae en una penalización y pierde un turno.`;
        jugadoresPenalizados.add(jugador.nombre);
    } else if (jugador.posicion === 4 || jugador.posicion === 22) {
        estadoJuego.textContent = `${jugador.nombre} avanza 2 casillas más!`;
        jugador.posicion = Math.min(jugador.posicion + 2, 34);
    }

    // Colocar la ficha en la nueva casilla
    const nuevaCasilla = tablero.children[jugador.posicion];
    nuevaCasilla.appendChild(jugador.ficha);

    return true; // Indica que el turno cambia
    }





    function tirarDado() {
        return Math.floor(Math.random() * 6) + 1;
    }

    tirarDadoBtn.addEventListener("click", function() {
        if (juegoTerminado) return;

        const jugadorActual = jugadores[turno];

        if (jugadoresPenalizados.has(jugadorActual.nombre)) {
            estadoJuego.textContent = `${jugadorActual.nombre} pierde su turno por penalización.`;
            jugadoresPenalizados.delete(jugadorActual.nombre);
            turno = (turno + 1) % jugadores.length;
            return;
        }

        const pasos = tirarDado();
        estadoJuego.textContent = `${jugadorActual.nombre} tira un ${pasos}.`;

        if (moverJugador(jugadorActual, pasos)) {
            turno = (turno + 1) % jugadores.length;
        } else if (juegoTerminado) {
            tirarDadoBtn.disabled = true;
        }
    });
});

//Boton de las reglas
document.getElementById("mostrarReglas").addEventListener("click", function() {
    const reglas = document.querySelector(".reglas");
    if (reglas.style.display === "none" || reglas.style.display === "") {
        reglas.style.display = "block";
        this.textContent = "Ocultar Reglas";
    } else {
        reglas.style.display = "none";
        this.textContent = "Mostrar Reglas";
    }
});
