var instrucciones = [
    "Utiliza las flechas de navegación para mover las piezas",
    "Para ordenar las piezas guíate por la imagen Objetivo"
];

//Vamos a guardar dentro de una variable los movimientos del rompecabezas
var movimientos = [

];

//Vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//Vamos a tener que crear en una matriz donde tengamos las posiciones correctas
var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//Necesito saber las coordenadas de la pieza vacía, la que se va a mover
var filaVacia = 2;
var columnaVacia = 2;

//Necesitamos una función que se encargue de mostrar las instrucciones
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}
//Esta función se encarga de crear el componente li y agregar la lista de dichas instrucciones

function mostrarInstruccionesLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

//Vamos a crear una función para saber que ganó
function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++) {
            var rompeActual = rompe[i][j];
            if (rompeActual !== rompeCorrecta[i][j]) {
                return false;
            }
        }
    }
    return true;
}

//Mostrar en html si se ganó
function mostrarCartelGanador() {
    if (checarSiGano()) {
        alert("Felicidades, ganaste el juego");
    }
    return false;
}

/*
Necesitamos una función que se encarge de poder intercambiar las posiciones de la pieza vacia vs cualquiera, para esto tenemos que hacer el uso de:
arreglo[][] = posicion[][]
//Intercambiar
posicion[][] = arreglo[][]
*/

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var pos1 = rompe[filaPos1, columnaPos1];
    var pos2 = rompe[filaPos2, columnaPos2];
    //Intercambio
    rompe[filaPos1, columnaPos1] = pos2;
    rompe[filaPos1, columnaPos2] = pos1;
}

function iniciar() {
    //Mezclar las piezas
    //Capturar el último movimiento
}

//Mandamos traer a la función
mostrarInstrucciones(instrucciones);