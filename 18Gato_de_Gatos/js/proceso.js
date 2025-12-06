var instrucciones = [
    "Solo hay 2 jugadodres los son X & O.",
    "El jugador 1 coloca su ficha en cualquier casilla disponible de uno de los tableros pequeños.",
    "El jugador 2 debe jugar en el tablero pequeño que corresponde a la posición donde el jugador 1 puso su ficha",
    "El primer jugador que logre formar una línea de tres fichas dentro de un tablero pequeño gana ese tablero.",
    "l jugador que consiga conquistar tres tableros pequeños alineados será el ganador de la partida.",
    "NOTA: este juego se realizo por peticion de los CONCENTIDOS que se jodan jaaja :V"
];

var movimientos = [];
var turno = 1;
var tableros = [
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
];

function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionesLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function cambiarTurno() {
    turno = (turno === 1) ? 2 : 1;
}

function registrarMovimiento(tableroIndex, fila, columna) {
    movimientos.push({
        tablero: tableroIndex,
        fila: fila,
        columna: columna,
        jugador: turno
    });
}

function mostrarCartelGanador(jugador) {
    var fichajugador = (jugador === 1) ? "X" : "O";
    alert("¡Felicidades, jugador " + jugador + " (" + fichajugador + "), ganaste!");
    guardarPartida("gana jugador " + jugador + " (" + fichajugador + ")");
}

function mostrarCartelEmpate() {
    alert("¡La partida terminó en empate!");
    guardarPartida("hubo un gato");
}

function guardarPartida(resultado) {
    fetch('/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ganador: resultado
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Partida guardada correctamente');
            } else {
                console.error('Error al guardar la partida:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al guardar la partida:', error);
        });
}

function colocarFicha(tableroIndex, fila, columna) {
    if (!tableroValido(tableroIndex)) {
        alert("No puedes jugar en este tablero");
        return false;
    }

    if (tableros[tableroIndex][fila][columna] !== 0) {
        alert("Esta casilla ya está ocupada");
        return false;
    }

    tableros[tableroIndex][fila][columna] = turno;
    registrarMovimiento(tableroIndex, fila, columna);

    const celda = document.getElementById("tablero-" + tableroIndex + "-celda-" + fila + "-" + columna);
    celda.innerText = (turno === 1) ? "X" : "O";

    var ganadorTablero = checarSiGanoTablero(tableros[tableroIndex]);
    if (ganadorTablero !== 0) {
        marcarTableroGanado(tableroIndex, ganadorTablero);
    }

    var ganadorPartida = checarSiGanoPartida();
    if (ganadorPartida !== 0) {
        mostrarCartelGanador(ganadorPartida);
        return true;
    }

    if (verificarEmpatePartida()) {
        mostrarCartelEmpate();
        return true;
    }

    cambiarTurno();
    actualizarIndicadorTablero();
    return true;
}

function checarSiGanoTablero(tablero) {
    for (var i = 0; i < 3; i++) {
        if (tablero[i][0] !== 0 && tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
            return tablero[i][0];
        }
        if (tablero[0][i] !== 0 && tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
            return tablero[0][i];
        }
    }

    if (tablero[0][0] !== 0 && tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) {
        return tablero[0][0];
    }
    if (tablero[0][2] !== 0 && tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) {
        return tablero[0][2];
    }
    return 0; // No hay ganador
}

function tableroValido(tableroIndex) {
    if (checarSiGanoTablero(tableros[tableroIndex]) !== 0) {
        return false;
    }

    if (movimientos.length === 0) {
        return true;
    }

    var ultimoMovimiento = movimientos[movimientos.length - 1];
    var tableroDestino = ultimoMovimiento.fila * 3 + ultimoMovimiento.columna;

    if (checarSiGanoTablero(tableros[tableroDestino]) !== 0 || esTableroLleno(tableros[tableroDestino])) {
        return true;
    }

    return tableroIndex === tableroDestino;
}

function obtenerTableroActivo() {
    if (movimientos.length === 0) {
        return -1;
    }

    var ultimoMovimiento = movimientos[movimientos.length - 1];
    var tableroDestino = ultimoMovimiento.fila * 3 + ultimoMovimiento.columna;

    if (checarSiGanoTablero(tableros[tableroDestino]) !== 0 || esTableroLleno(tableros[tableroDestino])) {
        return -1;
    }

    return tableroDestino;
}


function esTableroLleno(tablero) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (tablero[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function checarSiGanoPartida() {
    var tablerosGanados = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];

    for (var i = 0; i < tableros.length; i++) {
        var ganador = checarSiGanoTablero(tableros[i]);
        tablerosGanados[i] = ganador;
    }
    return checarSiGanoTablero([
        [tablerosGanados[0], tablerosGanados[1], tablerosGanados[2]],
        [tablerosGanados[3], tablerosGanados[4], tablerosGanados[5]],
        [tablerosGanados[6], tablerosGanados[7], tablerosGanados[8]]
    ]);
}

function verificarEmpatePartida() {
    for (var i = 0; i < tableros.length; i++) {
        if (checarSiGanoTablero(tableros[i]) === 0 && !esTableroLleno(tableros[i])) {
            return false;
        }
    }
    return true;
}

function reiniciarJuego() {
    movimientos = [];
    turno = 1;
    tableros = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            tableros.push([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        }
    }
}

function marcarTableroGanado(tableroIndex, ganador) {
    var tablero = document.getElementById("casilla" + (tableroIndex + 1));
    if (tablero) {
        tablero.classList.add("tablero-ganado");
        tablero.classList.add(ganador === 1 ? "ganado-x" : "ganado-o");
    }
}

function actualizarIndicadorTablero() {
    var tableroActivo = obtenerTableroActivo();

    for (var i = 0; i < 9; i++) {
        var tablero = document.getElementById("casilla" + (i + 1));
        if (tablero) {
            tablero.classList.remove("tablero-activo");
        }
    }

    if (tableroActivo !== -1) {
        var tablero = document.getElementById("casilla" + (tableroActivo + 1));
        if (tablero && checarSiGanoTablero(tableros[tableroActivo]) === 0) {
            tablero.classList.add("tablero-activo");
        }
    }

    var flecha = document.getElementById("flecha");
    if (flecha) {
        if (tableroActivo === -1) {
            flecha.textContent = "Jugador " + turno + " - Puedes jugar en cualquier tablero disponible";
        } else {
            flecha.textContent = "Jugador " + turno + " - Debes jugar en el tablero " + (tableroActivo + 1);
        }
    }
}

function iniciarJuego() {
    mostrarInstrucciones(instrucciones);
    reiniciarJuego();
    actualizarIndicadorTablero();
}

function reiniciarJuegoCompleto() {
    for (var i = 0; i < 9; i++) {
        for (var fila = 0; fila < 3; fila++) {
            for (var col = 0; col < 3; col++) {
                var celda = document.getElementById("tablero-" + i + "-celda-" + fila + "-" + col);
                if (celda) {
                    celda.innerText = "";
                }
            }
        }
        // Remover clases de tableros ganados
        var tablero = document.getElementById("casilla" + (i + 1));
        if (tablero) {
            tablero.classList.remove("tablero-ganado", "ganado-x", "ganado-o", "tablero-activo");
        }
    }

    reiniciarJuego();
    actualizarIndicadorTablero();
}