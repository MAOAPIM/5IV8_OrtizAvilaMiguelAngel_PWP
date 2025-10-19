function problema1() {
    const input = document.getElementById('p1-input').value;
    if (input.trim() === '') {
        document.getElementById('p1-output').textContent = 'Error: Por favor ingresa algunas palabras separadas por espacios';
        return;
    }
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(input)) {
        document.getElementById('p1-output').textContent = 'Error: Solo se permiten letras y espacios. No se aceptan números ni símbolos.';
        return;
    }
    const palabras = input.split(' ');
    const palabrasInvertidas = palabras.reverse();
    const resultado = palabrasInvertidas.join(' ');
    document.getElementById('p1-output').textContent = resultado;
}







function problema2() {

var p2_x1 = document.querySelector('#p2-x1').value;
var p2_x2 = document.querySelector('#p2-x2').value;
var p2_x3 = document.querySelector('#p2-x3').value;
var p2_x4 = document.querySelector('#p2-x4').value;
var p2_x5 = document.querySelector('#p2-x5').value;

var p2_y1 = document.querySelector('#p2-y1').value;
var p2_y2 = document.querySelector('#p2-y2').value;
var p2_y3 = document.querySelector('#p2-y3').value;
var p2_y4 = document.querySelector('#p2-y4').value;
var p2_y5 = document.querySelector('#p2-y5').value;

//creamos los vectores
var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

v1 = v1.sort(function(a, b){return a-b});
v2 = v2.sort(function(a, b){return b-a});

v2 = v2.reverse();

var p2_producto = 0;
for (var i = 0; i < v1.length; i++) {
    p2_producto += v1[i] * v2[i];
}

document.querySelector('#p2-output').textContent = 'El producto escalar minimo es: ' + p2_producto;


}


function problema3() {
    const input = document.getElementById('p3-input').value;
    if (input.trim() === '') {
        document.getElementById('p3-output').textContent = 'Error: Por favor ingresa palabras separadas por coma';
        return;
    }
    const regex = /^[A-Z,]+$/;
    if (!regex.test(input)) {
        document.getElementById('p3-output').textContent = 'Error: Solo se permiten letras en MAYUSCULA y comas. No se aceptan espacios, números ni otros símbolos.';
        return;
    }
    const palabras = input.split(',');
    let palabraMax = '';
    let maxUnicos = 0;
    let detalles = [];
    palabras.forEach(palabra => {
        if (palabra.trim() !== '') {
            const palabraUpper = palabra.toUpperCase();
            const caracteresUnicos = new Set(palabraUpper);
            const numUnicos = caracteresUnicos.size;
            detalles.push(`${palabraUpper} = ${numUnicos} (${Array.from(caracteresUnicos).sort().join(',')})`);
            if (numUnicos > maxUnicos) {
                maxUnicos = numUnicos;
                palabraMax = palabraUpper;
            }
        }
    });
    if (palabraMax === '') {
        document.getElementById('p3-output').textContent = 'No se encontraron palabras válidas';
    } else {
        document.getElementById('p3-output').textContent =
            `PALABRA GANADORA: "${palabraMax}"\n` +
            `CARACTERES ÚNICOS: ${maxUnicos}\n\n` +
            `DETALLES:\n${detalles.join('\n')}`;
    }
}

