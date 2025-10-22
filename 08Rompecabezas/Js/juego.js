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


//funcion que se encargue en donde esta la pieza vaicia

function actulizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVaciaVacia = nuevaColumna;
}


function posicionValida(fila, columna){
    return(fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//De

var codigosDireccion ={
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};


function moverEnDireccion (direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;
// si se mueve

    if (direccion === codigosDireccion.ABAJO){
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    } else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }else if(direccion === codigosDireccion.DERECHA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    }else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }


    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia))
    {
        //Funcin que haga que se intercambir las posiciones
        intercambiarPosiciones(filaVacia,columnaVacia,nuevaFilaPiezaVacia,nuevaColumnaPiezaVacia);
        actulizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    }
}


function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    var pos1 = rompe[fila1, columna1];
    var pos2 = rompe[fila2, columna2];
    //Intercambio ya debe ser por parte del frame del HTML

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    // para HTML
    intercambiarPosicionesDOM(`pieza`+pieza1, `pieza`+pieza2)
}



function intercambiarPosicionesDOM(idPieza1, idPieza2){
    var pieza1=document.getElementById(idPieza1);
    var pieza2=document.getElementById(idPieza2);


    //Vamos a clonar

    var padre = Elementpieza1.parentNode;


    var cloneElemento1 = pieza1.cloneNode(true);
    var cloneElemento2 = pieza2.cloneNode(false);

///Para este punto no funciona el apartado de la varaibla padre por alguna extraña razon 


// COPIAR DE ALGUN REPO  PARA GUIARNOS 




}

//Sola mando a llamar a que la posicion sea valida

function iniciar () {
    //Mezclar las piezas
    mezclarPiezas(30);
    capturarTeclas();
    //Capturar el último movimiento
}

iniciar();

//Mandamos traer a la función
mostrarInstrucciones(instrucciones);


