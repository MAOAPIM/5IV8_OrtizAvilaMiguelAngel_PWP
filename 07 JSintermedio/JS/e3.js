function validarTeclado(e) {
    var teclado = document.all ? e.keyCode : e.which;
    if (teclado == 8) return true; // Permite borrar

    var patron = /[0-9\d ]/;
    var codigo = String.fromCharCode(teclado);

    if (!patron.test(codigo)) return false;

// Validar que no supere 168
    var valorActual = e.target.value + codigo;
    if (parseInt(valorActual) > 168) {
        alert("No se pueden ingresar más de 168 horas.");
        return false;
    }

    return true;
}

function validarTecladoPago(e) {
    var teclado = document.all ? e.keyCode : e.which;
    if (teclado == 8) return true;

    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);

    if (codigo === '.' && e.target.value.indexOf('.') !== -1) {
        return false; 
// Solo permite un punto decimal
    }

    return patron.test(codigo);
}

function calcularSueldo() {
    var horasTrabajadasInput = document.getElementById("horas").value;
    var pagoHoraInput = document.getElementById("pagoPorHora").value;

    var horasTrabajadas = parseInt(horasTrabajadasInput);
    var pagoHora = parseFloat(pagoHoraInput);

    if (isNaN(horasTrabajadas) || isNaN(pagoHora)) {
        alert("Por favor, ingrese valores válidos en ambos campos");
        return;
    }

    if (horasTrabajadas < 0 || pagoHora < 0) {
        alert("Los valores deben ser números positivos");
        return;
    }

//  Validar que no supere 168 horas
    if (horasTrabajadas > 168) {
        alert("El número máximo de horas permitidas es 168.");
        return;
    }

    var sueldo = 0;

    if (horasTrabajadas <= 40) {
        sueldo = horasTrabajadas * pagoHora;
    } else {
        sueldo = 40 * pagoHora;
        var horasExtra = horasTrabajadas - 40;

        if (horasExtra <= 8) {
            sueldo += horasExtra * (pagoHora * 2);
        } else {
            sueldo += 8 * (pagoHora * 2);
            var horasTriple = horasExtra - 8;
            sueldo += horasTriple * (pagoHora * 3);
        }
    }

    document.getElementById("sueldo").value = "$ " + sueldo.toFixed(2);
}

function borrar() {
    document.getElementById("horas").value = "";
    document.getElementById("pagoPorHora").value = "";
    document.getElementById("sueldo").value = "";
}
