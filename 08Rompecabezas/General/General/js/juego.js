var instrucciones =[
    "Utiliza las flechas de navegacion para mover las piezas,",""
];

//Vamos a guardar dentro de una variable los movimientos del rompecabezas
var movimientos= [];


//Vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//Vamos a tener que crear una matriz donde tengamos las posicicionees correctas
var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//Ncesito saber las coordenadas de la pieza vacia, la que se va a mover
var filaVacia = 2;
var columnaVacia = 2;

//Necesitamos una funcion que se encargue de mostrar las instrucciones
function mostrarInstrucciones(instrucciones){
    for(var i=0; i<instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

//Esta funcuion se encarga de crear el componente Li y agregar la lista de dichas instrucciones.

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

//Vamos a crear una funcion para saber si gano
function checarsiGano(){
    for(var i=0; i<rompe.length; i++){
        for(var j=0; j<rompe[i].length; j++){
            var rompeActual = rompe[i][j];
            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
    }
}
    return true;

}

//mostrar en HTML si se gano

function mostrarCarterGanador(){
    if(checarsiGano()){
        alert("Felicidades, ganaste el juego");
    }
    return false
}

/*
Necesitamos una funcion que se encargue de poder intercamiar las posiciones de la pieza vacia vs cualquiera, pero esto, tenemos que hacer uso de:

arreglo[][] = posicion[][]
//intercambiar
posicion[][] = arreglo[][]
arreglo[][] = posicion[][]
*/ 

function intercambiarPosiciones(filaPos1,columnaPos1,filaPos2,columnaPos2){
    var pos1 = rompe[filaPos1, columnaPos1];
    var pos2 = rompe[filaPos2, columnaPos2];

    //intercambio
    rompe[filaPos1, columnaPos1] = pos2;
    rompe[filaPos2, columnaPos2] = pos1;
}

function inicar(){
    //Mezclar las piezas 
    //Capturar el ultimo movimiento
    
}
//Mnadamos a tarer a la funcion

mostrarInstrucciones(instrucciones);