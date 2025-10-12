function validarn(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d .]/; //Falta validar que no pueda poner mas de un punto
    var codigo = String.fromCharCode(teclado);

    if(codigo === '.' && e.target.value.indexOf('.') !== -1) {
        return false; //Ya no puede poner mas de un punto
    }

    return patron.test(codigo);
}

function interes(){
    var valor = document.getElementById("cantidadi").value;

    //Validar que el valor esta entre 3 y 10 numeros
    if (!valor || isNaN(valor) || valor.length < 3 || valor.length > 10) {
        alert("Ingresa un número entre 3 y 10 dígitos.");
        return;
    }

    var parseo = parseFloat(valor);
    var interes = parseo * 0.085;
    var total = interes + parseo; 

    // Limitar el total a dos decimales
    total = total.toFixed(2);
    document.getElementById("saldoi").value = "$ " + total;
}

function borrari(){
    document.getElementById("saldoi").value = "";
    document.getElementById("cantidadi").value = "";
}


//Del ejercico hay que agragar el campo numero de meses y sera a una inversion de maximo 18 meses

//Se deben de ingresar 3 ventas un sueldo base y despuies calcular el monto total, debe de aparecer cuanto cobra por comision y suma.

//Se debe ingresar un producto, con un precio aplicarle el 15% y el sistema debe mostrar el producto, precio, y su 


