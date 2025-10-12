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

